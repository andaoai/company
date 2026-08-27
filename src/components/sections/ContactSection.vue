<template>
  <section :id="data.id" :class="['section', { 'section-alt': data.alt }]">
    <div class="container">
      <SectionHead
        :kicker="data.kicker"
        :title="data.title"
        :title-accent="data.titleAccent"
        :desc="data.desc"
      />
      <div v-if="data.cards?.length" class="contact-grid">
        <ContactCard v-for="(c, i) in data.cards" :key="i" :data="c" />
      </div>
      <div v-if="data.meta?.length" class="contact-meta">
        <div v-for="(m, i) in data.meta" :key="i">
          <span>{{ m.icon }}</span>{{ m.text }}
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import SectionHead from '../layout/SectionHead.vue'
import ContactCard from '../cards/ContactCard.vue'
defineProps({ data: { type: Object, required: true } })
</script>
