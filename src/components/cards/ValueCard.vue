<template>
  <div class="about-card">
    <div class="card-icon">
      <component :is="iconComp" size="md" />
    </div>
    <h3>{{ data.title }}</h3>
    <p>{{ data.desc }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { resolveIcon } from '../icons'

const props = defineProps({ data: { type: Object, required: true } })
const iconComp = computed(() => resolveIcon(props.data.icon))
</script>
