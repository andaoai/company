<template>
  <div class="contact-card">
    <div class="contact-label">{{ data.label }}</div>
    <div class="contact-value">{{ data.value }}</div>
    <a :href="`mailto:${data.email}`" class="contact-link">
      <IconMail size="xs" />
      {{ data.email }}
    </a>
  </div>
</template>

<script setup>
import IconMail from '../icons/IconMail.vue'
defineProps({ data: { type: Object, required: true } })
</script>
