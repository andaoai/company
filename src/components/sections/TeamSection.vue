<template>
  <section :id="data.id" :class="['section', { 'section-alt': data.alt }]">
    <div class="container">
      <SectionHead
        :kicker="data.kicker"
        :title="data.title"
        :title-accent="data.titleAccent"
      />
      <div v-if="data.members?.length" class="team-grid">
        <PersonCard v-for="(m, i) in data.members" :key="i" :data="m" />
      </div>
    </div>
  </section>
</template>

<script setup>
import SectionHead from '../layout/SectionHead.vue'
import PersonCard from '../cards/PersonCard.vue'
defineProps({ data: { type: Object, required: true } })
</script>
