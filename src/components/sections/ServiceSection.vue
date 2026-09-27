<template>
  <section :id="data.id" :class="['section', { 'section-alt': data.alt }]">
    <div class="container">
      <SectionHead
        :kicker="data.kicker"
        :title="data.title"
        :title-accent="data.titleAccent"
        :desc="data.desc"
      />
      <div v-if="data.items?.length" class="service-grid">
        <ServiceCard v-for="(it, i) in data.items" :key="i" :data="it" />
      </div>
      <p v-if="data.note" class="service-note" v-html="data.note"></p>
    </div>
  </section>
</template>

<script setup>
import SectionHead from '../layout/SectionHead.vue'
import ServiceCard from '../cards/ServiceCard.vue'
defineProps({ data: { type: Object, required: true } })
</script>
