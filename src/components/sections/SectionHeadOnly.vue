<template>
  <section :id="data.id" :class="['section', { 'section-alt': data.alt }]">
    <div class="container">
      <SectionHead
        :kicker="data.kicker"
        :title="data.title"
        :title-accent="data.titleAccent"
        :desc="data.desc"
      />
    </div>
  </section>
</template>

<script setup>
import SectionHead from '../layout/SectionHead.vue'
defineProps({ data: { type: Object, required: true } })
</script>
