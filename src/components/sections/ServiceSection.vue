<template>
  <section :id="data.id" :class="['section', { 'section-alt': data.alt }]">
    <div class="container">
      <SectionHead
        :kicker="data.kicker"
        :title="data.title"
        :title-accent="data.titleAccent"
        :desc="data.desc"
      />
      <div v-if="data.offer" class="service-offer">
        <div v-if="data.offer.badge" class="offer-badge">{{ data.offer.badge }}</div>
        <div class="offer-steps">
          <div v-for="(s, i) in data.offer.steps" :key="i" class="offer-step">
            <component :is="resolveIcon(s.icon)" size="sm" />
            <div class="offer-step-body">
              <div class="offer-step-title">
                <span v-if="s.pill" :class="['offer-pill', s.pill === '免费' ? 'is-free' : 'is-paid']">{{ s.pill }}</span>
                {{ s.title }}
              </div>
              <p v-if="s.desc">{{ s.desc }}</p>
            </div>
            <span v-if="i < data.offer.steps.length - 1" class="offer-arrow">→</span>
          </div>
        </div>
      </div>
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
import { resolveIcon } from '../icons'
defineProps({ data: { type: Object, required: true } })
</script>
