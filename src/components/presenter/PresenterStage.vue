<template>
  <div ref="stageRef" class="present-stage" aria-hidden="true">
    <div
      v-for="(s, i) in slides"
      :key="s.id"
      :class="['present-slide', { active: i === idx }]"
    >
      <div class="slide-section" :class="{ 'section-alt': s.alt }">
        <component
          :is="layoutMap[s.layout]"
          :data="s"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import HeroSection from '../sections/HeroSection.vue'
import AboutSection from '../sections/AboutSection.vue'
import TeamSection from '../sections/TeamSection.vue'
import TechSection from '../sections/TechSection.vue'
import IndustrySection from '../sections/IndustrySection.vue'
import ContactSection from '../sections/ContactSection.vue'
import SectionHeadOnly from '../sections/SectionHeadOnly.vue'

const layoutMap = {
  hero: HeroSection,
  'grid-3': AboutSection,
  'grid-3-person': TeamSection,
  'grid-4': IndustrySection,
  'grid-3-contact': ContactSection,
  'tech-list': TechSection,
  'section-head-only': SectionHeadOnly,
}

defineProps({
  slides: { type: Array, required: true },
  idx: { type: Number, required: true },
  stageRef: { type: Object, required: true }, // HTMLElement ref from usePresenter
})
</script>
