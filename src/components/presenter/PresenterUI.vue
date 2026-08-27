<template>
  <div class="present-ui" aria-hidden="true">
    <div class="present-counter">
      <span class="present-cur">{{ idx + 1 }}</span> / <span class="present-total">{{ total }}</span>
    </div>
    <button class="present-exit" aria-label="退出演示" @click="exit">
      <IconX size="md" />
    </button>
    <div class="present-progress">
      <div class="present-progress-bar" :style="{ width: progressPct + '%' }"></div>
    </div>
    <div class="present-hint">← → 切换 · 空格 下一页 · Esc 退出 · F 全屏</div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import IconX from '../icons/IconX.vue'

const props = defineProps({
  idx: { type: Number, required: true },
  total: { type: Number, required: true },
  exit: { type: Function, required: true },
})

const progressPct = computed(() => ((props.idx + 1) / props.total) * 100)
</script>
