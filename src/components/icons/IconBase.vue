<template>
  <svg
    :class="['icon', sizeClass]"
    :width="sizePx"
    :height="sizePx"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    :stroke-width="strokeWidth"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <slot />
  </svg>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  size: { type: String, default: 'md' }, // xs | sm | md | lg
  strokeWidth: { type: Number, default: 1.5 },
})

const sizeMap = { xs: 14, sm: 18, md: 24, lg: 32 }
const sizePx = computed(() => sizeMap[props.size] ?? 24)
const sizeClass = computed(() => `icon-${props.size}`)
</script>
