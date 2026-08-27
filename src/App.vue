<template>
  <div class="bg-grid"></div>
  <div class="bg-glow"></div>

  <SiteHeader :site="site" :slides="slides" />

  <main>
    <component
      v-for="s in slides"
      :key="s.id"
      :is="layoutMap[s.layout]"
      :data="s"
    />
  </main>

  <SiteFooter :site="site" />

  <PresenterStage
    :slides="slides"
    :idx="presenter.idx.value"
    :stage-ref="presenter.stageRef"
  />
  <PresenterUI
    :idx="presenter.idx.value"
    :total="presenter.total"
    :exit="presenter.exit"
  />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import siteData from './data/site.json'
import slidesData from './data/slides.json'
import { usePresenter } from './composables/usePresenter'

import HeroSection from './components/sections/HeroSection.vue'
import AboutSection from './components/sections/AboutSection.vue'
import TeamSection from './components/sections/TeamSection.vue'
import TechSection from './components/sections/TechSection.vue'
import IndustrySection from './components/sections/IndustrySection.vue'
import ContactSection from './components/sections/ContactSection.vue'
import SectionHeadOnly from './components/sections/SectionHeadOnly.vue'

import SiteHeader from './components/layout/SiteHeader.vue'
import SiteFooter from './components/layout/SiteFooter.vue'
import PresenterStage from './components/presenter/PresenterStage.vue'
import PresenterUI from './components/presenter/PresenterUI.vue'

const site = ref(siteData)
const slides = ref(slidesData.slides)

const layoutMap = {
  hero: HeroSection,
  'grid-3': AboutSection,
  'grid-3-person': TeamSection,
  'grid-4': IndustrySection,
  'grid-3-contact': ContactSection,
  'tech-list': TechSection,
  'section-head-only': SectionHeadOnly,
}

// 演示模式（仅在演示模式下显示 PPT，body.present-mode 由 composable 内部管理）
const presenter = usePresenter(slides.value)

// 平滑滚动 + 当前 section 高亮
let navLinks = []
let sections = []
function onScroll() {
  let cur = ''
  sections.forEach(s => {
    if (window.scrollY + 120 >= s.offsetTop) cur = s.id
  })
  navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + cur))
}

onMounted(() => {
  // 平滑滚动
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href')
      if (id && id.length > 1) {
        const el = document.querySelector(id)
        if (el) {
          e.preventDefault()
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }
    })
  })
  // scroll spy
  navLinks = Array.from(document.querySelectorAll('.nav-links a'))
  sections = Array.from(document.querySelectorAll('main section[id]'))
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>
