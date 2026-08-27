<template>
  <div :class="['case-card', { 'case-card-featured': data.featured }]">
    <div class="case-card-head">
      <span class="case-industry">{{ data.industry }}</span>
      <span :class="['case-type', `case-type-${data.clientType === '国企' ? 'soe' : 'private'}`]">
        {{ data.clientType }}
      </span>
    </div>
    <h4 class="case-title">{{ data.title }}</h4>
    <p class="case-desc">{{ data.desc }}</p>
    <div class="case-foot">
      <span class="case-client">{{ data.client }}</span>
      <span class="case-period">{{ data.period }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({ data: { type: Object, required: true } })
</script>

<style scoped>
.case-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 22px 22px 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: all 0.25s ease;
  position: relative;
  overflow: hidden;
}

.case-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(79, 143, 255, 0.4), transparent);
  opacity: 0;
  transition: opacity 0.25s ease;
}

.case-card:hover {
  border-color: var(--border-2);
  transform: translateY(-2px);
  background: var(--surface-2);
}

.case-card:hover::before {
  opacity: 1;
}

.case-card-featured {
  border-color: rgba(79, 143, 255, 0.3);
  background: linear-gradient(180deg, rgba(79, 143, 255, 0.04) 0%, var(--surface) 100%);
}

.case-card-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}

.case-industry {
  font-size: 12px;
  color: var(--text-dim);
  letter-spacing: 0.02em;
}

.case-type {
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 10px;
  font-weight: 500;
}

.case-type-soe {
  color: #8a8a9e;
  background: rgba(138, 138, 158, 0.1);
  border: 1px solid rgba(138, 138, 158, 0.3);
}

.case-type-private {
  color: #4f8fff;
  background: rgba(79, 143, 255, 0.08);
  border: 1px solid rgba(79, 143, 255, 0.25);
}

.case-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text);
  line-height: 1.4;
  margin: 0;
}

.case-desc {
  font-size: 13px;
  color: var(--text-dim);
  line-height: 1.6;
  margin: 0;
  flex: 1;
}

.case-foot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  border-top: 1px solid var(--border);
  gap: 8px;
}

.case-client {
  font-size: 12px;
  color: var(--text-dimmer);
}

.case-period {
  font-size: 11px;
  color: var(--cyan);
  font-family: 'JetBrains Mono', monospace;
}
</style>
