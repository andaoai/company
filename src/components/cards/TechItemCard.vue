<template>
  <div class="tech-item">
    <h4 class="tech-title">
      <component :is="iconComp" size="sm" />
      {{ data.title }}
    </h4>
    <p>{{ data.desc }}</p>
    <div v-if="data.value" class="tech-value">{{ data.value }}</div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { resolveIcon } from '../icons'

const props = defineProps({ data: { type: Object, required: true } })
const iconComp = computed(() => resolveIcon(props.data.icon))
</script>
