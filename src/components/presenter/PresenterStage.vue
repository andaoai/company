<template>
  <div :ref="(el) => onStage(el)" class="present-stage" aria-hidden="true">
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
import TechBaseSection from '../sections/TechBaseSection.vue'
import IndustrySection from '../sections/IndustrySection.vue'
import ContactSection from '../sections/ContactSection.vue'
import SectionHeadOnly from '../sections/SectionHeadOnly.vue'
import CasesSection from '../sections/CasesSection.vue'

const layoutMap = {
  hero: HeroSection,
  'grid-3': AboutSection,
  'grid-3-person': TeamSection,
  'grid-4': IndustrySection,
  'grid-3-contact': ContactSection,
  'grid-2': TechBaseSection,
  'tech-list': TechSection,
  'section-head-only': SectionHeadOnly,
  cases: CasesSection,
}

const props = defineProps({
  slides: { type: Array, required: true },
  idx: { type: Number, required: true },
  stageRef: { type: Object, required: true }, // 父级 ref 对象，子组件用函数 ref 写回 DOM
})

// 函数 ref：把 stage DOM 元素直接写进父级的 ref.value
function onStage(el) {
  if (props.stageRef) {
    props.stageRef.value = el
  }
}
</script>
