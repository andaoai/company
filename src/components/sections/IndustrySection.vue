<template>
  <section :id="data.id" :class="['section', { 'section-alt': data.alt }]">
    <div class="container">
      <SectionHead
        :kicker="data.kicker"
        :title="data.title"
        :title-accent="data.titleAccent"
        :desc="data.desc"
      />
      <div v-if="data.cards?.length" class="industry-grid">
        <IndustryCard v-for="(c, i) in data.cards" :key="i" :data="c" />
      </div>
    </div>
  </section>
</template>

<script setup>
import SectionHead from '../layout/SectionHead.vue'
import IndustryCard from '../cards/IndustryCard.vue'
defineProps({ data: { type: Object, required: true } })
</script>
