<template>
  <section :id="data.id" :class="['section', { 'section-alt': data.alt }]">
    <div class="container">
      <SectionHead
        :kicker="data.kicker"
        :title="data.title"
        :title-accent="data.titleAccent"
        :desc="data.desc"
      />
      <div v-if="data.items?.length" class="tech-col tech-col-full">
        <TechItemCard v-for="(it, i) in data.items" :key="i" :data="it" />
      </div>
    </div>
  </section>
</template>

<script setup>
import SectionHead from '../layout/SectionHead.vue'
import TechItemCard from '../cards/TechItemCard.vue'
defineProps({ data: { type: Object, required: true } })
</script>
