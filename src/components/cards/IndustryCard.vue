<template>
  <div class="industry-card">
    <div class="ind-icon">
      <component :is="iconComp" size="md" />
    </div>
    <h4>{{ data.title }}</h4>
    <ul>
      <li v-for="(item, i) in data.items" :key="i">{{ item }}</li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { resolveIcon } from '../icons'

const props = defineProps({ data: { type: Object, required: true } })
const iconComp = computed(() => resolveIcon(props.data.icon))
</script>
