<template>
  <div class="service-card">
    <div class="service-card-head">
      <component :is="iconComp" size="md" />
      <span v-if="data.tag" class="service-tag">{{ data.tag }}</span>
    </div>
    <h4 class="service-title">{{ data.title }}</h4>
    <p>{{ data.desc }}</p>
    <div v-if="data.value" class="service-value">{{ data.value }}</div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { resolveIcon } from '../icons'

const props = defineProps({ data: { type: Object, required: true } })
const iconComp = computed(() => resolveIcon(props.data.icon))
</script>
