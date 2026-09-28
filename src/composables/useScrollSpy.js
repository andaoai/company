// Scroll Spy：滚动时根据当前可视 section 高亮对应的导航链接
// 依赖 CSS 的 scroll-behavior: smooth 实现平滑锚点跳转（无需再手写锚点 JS）
import { onMounted, onUnmounted } from 'vue'

export function useScrollSpy(navSelector = '.nav-links a', sectionSelector = 'main section[id]') {
  let navLinks = []
  let sections = []

  function onScroll() {
    let current = ''
    sections.forEach(section => {
      if (window.scrollY + 120 >= section.offsetTop) current = section.id
    })
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current)
    })
  }

  onMounted(() => {
    navLinks = Array.from(document.querySelectorAll(navSelector))
    sections = Array.from(document.querySelectorAll(sectionSelector))
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
  })
}
