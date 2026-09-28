<template>
  <div :ref="onStage" class="present-stage" aria-hidden="true">
    <div
      v-for="(slide, i) in slides"
      :key="slide.id"
      :class="['present-slide', { active: i === idx }]"
    >
      <div class="slide-section" :class="{ 'section-alt': slide.alt }">
        <component
          :is="layoutMap[slide.layout]"
          :data="slide"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { layoutMap } from '../../config/layouts'

const props = defineProps({
  slides: { type: Array, required: true },
  idx: { type: Number, required: true },
  stageRef: { type: Object, required: true }, // 父级 ref 对象，子组件用函数 ref 写回 DOM
})

// 函数 ref：把 stage DOM 元素直接写进父级的 ref.value
function onStage(el) {
  props.stageRef.value = el
}
</script>
