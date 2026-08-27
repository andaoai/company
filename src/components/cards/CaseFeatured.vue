<template>
  <div class="case-featured">
    <div class="case-featured-badge">⭐ 精选案例 · 已稳定运行 2 年</div>

    <div class="case-featured-grid">
      <div class="case-featured-main">
        <div class="case-featured-meta">
          <span class="case-featured-industry">{{ data.industry }}</span>
          <span class="case-featured-divider">·</span>
          <span class="case-featured-client">{{ data.client }}</span>
          <span class="case-featured-divider">·</span>
          <span class="case-featured-type">{{ data.clientType }}</span>
        </div>

        <h3 class="case-featured-title">{{ data.title }}</h3>

        <div class="case-featured-section">
          <div class="case-featured-label">痛点</div>
          <p class="case-featured-text">{{ data.problem }}</p>
        </div>

        <div class="case-featured-section">
          <div class="case-featured-label">做法</div>
          <p class="case-featured-text">{{ data.solution }}</p>
        </div>

        <div v-if="data.tags?.length" class="case-featured-tags">
          <span v-for="t in data.tags" :key="t" class="case-featured-tag">{{ t }}</span>
        </div>
      </div>

      <div class="case-featured-metrics">
        <div
          v-for="(m, i) in data.metrics"
          :key="i"
          :class="['case-featured-metric', `stage-${m.stage}`]"
        >
          <div class="case-featured-metric-value">{{ m.value }}</div>
          <div class="case-featured-metric-label">
            {{ m.label }}
            <span v-if="m.stage" class="case-featured-metric-stage">{{ m.stage }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({ data: { type: Object, required: true } })
</script>

<style scoped>
.case-featured {
  position: relative;
  background:
    radial-gradient(ellipse at top right, rgba(79, 143, 255, 0.12) 0%, transparent 60%),
    radial-gradient(ellipse at bottom left, rgba(0, 212, 255, 0.08) 0%, transparent 50%),
    var(--surface);
  border: 1px solid rgba(79, 143, 255, 0.3);
  border-radius: var(--radius-lg);
  padding: 36px 40px;
  overflow: hidden;
}

.case-featured::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #4f8fff 30%, #00d4ff 70%, transparent);
}

.case-featured-badge {
  display: inline-block;
  font-size: 12px;
  font-weight: 500;
  color: var(--cyan);
  background: rgba(0, 212, 255, 0.08);
  border: 1px solid rgba(0, 212, 255, 0.25);
  padding: 4px 12px;
  border-radius: 20px;
  margin-bottom: 20px;
  letter-spacing: 0.02em;
}

.case-featured-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 40px;
  align-items: center;
}

.case-featured-main {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.case-featured-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--text-dim);
  flex-wrap: wrap;
}

.case-featured-industry {
  color: var(--cyan);
  font-weight: 500;
}

.case-featured-divider {
  color: var(--text-dimmer);
}

.case-featured-title {
  font-size: 28px;
  font-weight: 700;
  color: var(--text);
  line-height: 1.3;
  margin: 4px 0 8px;
  letter-spacing: -0.01em;
}

.case-featured-section {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.case-featured-label {
  font-size: 11px;
  color: var(--text-dimmer);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 500;
}

.case-featured-text {
  font-size: 14px;
  color: var(--text);
  line-height: 1.6;
  margin: 0;
}

.case-featured-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 4px;
}

.case-featured-tag {
  font-size: 11px;
  color: var(--text-dim);
  background: var(--surface-2);
  padding: 3px 10px;
  border-radius: 10px;
  border: 1px solid var(--border);
}

.case-featured-metrics {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.case-featured-metric {
  background: rgba(79, 143, 255, 0.05);
  border: 1px solid rgba(79, 143, 255, 0.15);
  border-radius: var(--radius);
  padding: 16px 20px;
  position: relative;
  overflow: hidden;
}

.case-featured-metric::after {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: var(--gradient);
}

.case-featured-metric-value {
  font-size: 28px;
  font-weight: 700;
  background: var(--gradient);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.2;
  font-family: 'JetBrains Mono', monospace;
  letter-spacing: -0.01em;
}

.case-featured-metric-label {
  font-size: 13px;
  color: var(--text-dim);
  margin-top: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.case-featured-metric-stage {
  font-size: 10px;
  color: var(--text-dimmer);
  background: var(--surface-2);
  padding: 1px 6px;
  border-radius: 8px;
  border: 1px solid var(--border);
}

@media (max-width: 860px) {
  .case-featured { padding: 24px 20px; }
  .case-featured-grid { grid-template-columns: 1fr; gap: 24px; }
  .case-featured-title { font-size: 22px; }
  .case-featured-metrics { flex-direction: row; flex-wrap: wrap; }
  .case-featured-metric { flex: 1; min-width: 120px; }
}
</style>
