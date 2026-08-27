<template>
  <div :class="['team-card', { featured: data.featured }]">
    <div v-if="data.featured && data.badge" class="featured-badge">{{ data.badge }}</div>
    <div class="avatar">{{ data.avatar }}</div>
    <div class="team-role">{{ data.role }}</div>
    <h3 class="team-name">{{ data.name }}</h3>
    <p class="team-bio">{{ data.bio }}</p>
    <div v-if="data.tags?.length" class="team-tags">
      <span v-for="t in data.tags" :key="t">{{ t }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({ data: { type: Object, required: true } })
</script>
