<template>
  <div v-if="kicker || title || desc" class="section-head">
    <div v-if="kicker" class="kicker">{{ kicker }}</div>
    <h2 v-if="title || titleAccent" class="section-title">
      <template v-if="title">{{ title }}<br v-if="titleAccent" /></template>
      <span v-if="titleAccent" class="gradient-text">{{ titleAccent }}</span>
    </h2>
    <p v-if="desc" class="section-desc">{{ desc }}</p>
  </div>
</template>

<script setup>
defineProps({
  kicker: { type: String, default: '' },
  title: { type: String, default: '' },
  titleAccent: { type: String, default: '' },
  desc: { type: String, default: '' },
})
</script>
