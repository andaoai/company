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
  let hintTimer = null

  function showHint() {
    // 可选：hint 自动淡出（CSS 处理）
  }

  function fitSlide() {
    const stage = stageRef.value
    if (!stage) return
    const slide = stage.querySelector('.present-slide.active')
    if (!slide) return
    const sw = stage.clientWidth
    const sh = stage.clientHeight
    const s = Math.min(sw / SLIDE_W, sh / SLIDE_H)
    slide.style.transform = `scale(${s})`
  }

  function update() {
    if (!stageRef.value) return
    const total = slides.length
    stageRef.value.querySelectorAll('.present-slide').forEach((s, i) => {
      s.classList.toggle('active', i === idx.value)
    })
    // 由 PresenterUI 组件通过响应式状态自动更新文本与进度
    showHint()
    requestAnimationFrame(fitSlide)
  }

  function enter() {
    if (active.value) return
    // 从当前滚动位置推断起始 slide
    let nearest = 0
    const sy = window.scrollY + 100
    slides.forEach((s, i) => {
      const el = document.getElementById(s.id)
      if (el && el.offsetTop <= sy) nearest = i
    })
    idx.value = nearest
    active.value = true
    requestAnimationFrame(() => requestAnimationFrame(() => {
      update()
      document.documentElement.requestFullscreen?.().catch(() => {})
    }))
  }

  function exit() {
    if (!active.value) return
    active.value = false
    clearTimeout(hintTimer)
    // 清理 URL 入参
    try {
      const h = location.hash.toLowerCase()
      const s = location.search.toLowerCase()
      if (h.startsWith('#present') || /[?&]present(\b|=)/i.test(s)) {
        history.replaceState(
          null, '',
          location.pathname +
            location.search.replace(/[?&]present=[^&]*/i, '').replace(/[?&]present\b/i, ''),
        )
      }
    } catch (e) { /* ignore */ }
    if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {})
  }

  function next() { if (idx.value < slides.length - 1) { idx.value++; update() } }
  function prev() { if (idx.value > 0) { idx.value--; update() } }
  function goTo(n) { if (n >= 0 && n < slides.length) { idx.value = n; update() } }

  function toggleFullscreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen?.()
    } else {
      document.documentElement.requestFullscreen?.().catch(() => {})
    }
  }

  // URL 检测
  function wantsPresent() {
    const h = location.hash.toLowerCase()
    const s = location.search.toLowerCase()
    return h.startsWith('#present') || /[?&]present(\b|=)/.test(s)
  }

  // 键盘处理
  function onKeydown(e) {
    if (!active.value) {
      // 演示模式外：不响应
      return
    }
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
      case '1': case '2': case '3': case '4': case '5':
      case '6': case '7': case '8': case '9':
        e.preventDefault(); goTo(parseInt(e.key, 10) - 1); break
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
    if (wantsPresent()) {
      setTimeout(enter, 50)
    }
  })

  onUnmounted(() => {
    document.removeEventListener('keydown', onKeydown)
    window.removeEventListener('resize', onResize)
    document.removeEventListener('fullscreenchange', onFullscreenChange)
    window.removeEventListener('hashchange', onHashChange)
    clearTimeout(hintTimer)
  })

  return {
    // state
    active, idx, stageRef, total: slides.length,
    // actions
    enter, exit, next, prev, goTo, toggleFullscreen,
  }
}
