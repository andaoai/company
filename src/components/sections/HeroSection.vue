<template>
  <section :id="data.id" class="hero">
    <div class="container">
      <div v-if="data.tag" class="hero-tag">{{ data.tag }}</div>
      <h1 class="hero-title">
        {{ data.title }}<br />
        <span v-if="data.titleAccent" class="gradient-text">{{ data.titleAccent }}</span>
      </h1>
      <p v-if="data.sub" class="hero-sub">{{ data.sub }}</p>
      <div v-if="data.actions?.length" class="hero-actions">
        <a
          v-for="(a, i) in data.actions"
          :key="i"
          :href="a.href"
          :class="['btn', a.variant === 'primary' ? 'btn-primary' : 'btn-ghost']"
        >{{ a.label }}</a>
      </div>
      <div v-if="data.stats?.length" class="hero-stats">
        <div v-for="(s, i) in data.stats" :key="i" class="stat">
          <div class="stat-num gradient-text">{{ s.num }}</div>
          <div class="stat-label">{{ s.label }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({ data: { type: Object, required: true } })
</script>
