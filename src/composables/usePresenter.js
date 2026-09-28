// PPT 演示模式 composable
// - 固定 16:9 画布（1600×900），按视口大小整体缩放
// - 键盘控制：←/→/Space/PageUp/PageDown/Home/End/F/Esc
// - URL 入参：#present / ?present / ?present=1
// - 退出时清理 URL 参数
import { ref, onMounted, onUnmounted } from 'vue'

const SLIDE_W = 1600
const SLIDE_H = 900

export function usePresenter(slides) {
  const active = ref(false)
  const idx = ref(0)
  const stageRef = ref(null)

  function fitSlide() {
    const stage = stageRef.value
    if (!stage) return
    const slide = stage.querySelector('.present-slide.active')
    if (!slide) return
    const scale = Math.min(stage.clientWidth / SLIDE_W, stage.clientHeight / SLIDE_H)
    slide.style.transform = `scale(${scale})`
  }

  function update() {
    if (!stageRef.value) return
    stageRef.value.querySelectorAll('.present-slide').forEach((slide, i) => {
      slide.classList.toggle('active', i === idx.value)
    })
    // 幻灯片内的文本与进度由 PresenterUI 通过响应式状态自动更新
    requestAnimationFrame(fitSlide)
  }

  function enter() {
    if (active.value) return
    // 从当前滚动位置推断起始 slide
    let nearest = 0
    const scrollY = window.scrollY + 100
    slides.forEach((slide, i) => {
      const el = document.getElementById(slide.id)
      if (el && el.offsetTop <= scrollY) nearest = i
    })
    idx.value = nearest
    active.value = true
    document.body.classList.add('present-mode')
    requestAnimationFrame(() => requestAnimationFrame(() => {
      update()
      document.documentElement.requestFullscreen?.().catch(() => {})
    }))
  }

  function exit() {
    if (!active.value) return
    active.value = false
    document.body.classList.remove('present-mode')
    // 清理 URL 入参
    try {
      const hash = location.hash.toLowerCase()
      const search = location.search.toLowerCase()
      if (hash.startsWith('#present') || /[?&]present(\b|=)/i.test(search)) {
        history.replaceState(
          null, '',
          location.pathname +
            location.search.replace(/[?&]present=[^&]*/i, '').replace(/[?&]present\b/i, ''),
        )
      }
    } catch (e) { /* ignore */ }
    if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {})
  }

  function next() {
    if (idx.value < slides.length - 1) { idx.value++; update() }
  }
  function prev() {
    if (idx.value > 0) { idx.value--; update() }
  }
  function goTo(n) {
    if (n >= 0 && n < slides.length) { idx.value = n; update() }
  }

  function toggleFullscreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen?.()
    } else {
      document.documentElement.requestFullscreen?.().catch(() => {})
    }
  }

  function wantsPresent() {
    return (
      location.hash.toLowerCase().startsWith('#present') ||
      /[?&]present(\b|=)/.test(location.search.toLowerCase())
    )
  }

  function onKeydown(e) {
    if (!active.value) return
    switch (e.key) {
      case 'Escape': e.preventDefault(); exit(); break
      case 'ArrowRight':
      case 'PageDown':
      case ' ':
        e.preventDefault(); next(); break
      case 'ArrowLeft':
      case 'PageUp':
        e.preventDefault(); prev(); break
      case 'Home': e.preventDefault(); goTo(0); break
      case 'End': e.preventDefault(); goTo(slides.length - 1); break
      case 'f': case 'F': e.preventDefault(); toggleFullscreen(); break
      default:
        if (/^[1-9]$/.test(e.key)) {
          e.preventDefault()
          goTo(parseInt(e.key, 10) - 1)
        }
    }
  }

  function onResize() {
    if (active.value) fitSlide()
  }

  function onFullscreenChange() {
    if (active.value) setTimeout(fitSlide, 100)
  }

  function onHashChange() {
    if (wantsPresent() && !active.value) {
      enter()
    } else if (!wantsPresent() && active.value) {
      exit()
    }
  }

  onMounted(() => {
    document.addEventListener('keydown', onKeydown)
    window.addEventListener('resize', onResize)
    document.addEventListener('fullscreenchange', onFullscreenChange)
    window.addEventListener('hashchange', onHashChange)
    if (wantsPresent()) setTimeout(enter, 50)
  })

  onUnmounted(() => {
    document.removeEventListener('keydown', onKeydown)
    window.removeEventListener('resize', onResize)
    document.removeEventListener('fullscreenchange', onFullscreenChange)
    window.removeEventListener('hashchange', onHashChange)
  })

  return {
    active, idx, stageRef, total: slides.length,
    enter, exit, next, prev, goTo, toggleFullscreen,
  }
}
