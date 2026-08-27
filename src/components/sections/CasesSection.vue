<template>
  <section :id="data.id" :class="['section', { 'section-alt': data.alt }]">
    <div class="container">
      <SectionHead
        :kicker="data.kicker"
        :title="data.title"
        :title-accent="data.titleAccent"
        :desc="data.desc"
      />

      <!-- 顶部数字带 -->
      <div class="cases-stats">
        <div v-for="(s, i) in casesData.stats" :key="i" class="cases-stat">
          <div class="cases-stat-num">
            {{ s.num }}<span v-if="s.suffix" class="cases-stat-suffix">{{ s.suffix }}</span>
          </div>
          <div class="cases-stat-label">{{ s.label }}</div>
        </div>
      </div>

      <!-- 精选案例 -->
      <div class="cases-hero">
        <CaseFeatured :data="casesData.hero" />
      </div>

      <!-- 5 业务路线分组 -->
      <div class="cases-routes">
        <div v-for="route in casesData.routes" :key="route.id" class="cases-route">
          <div :class="['cases-route-head', `route-${route.color}`]">
            <div class="cases-route-head-icon">
              <component :is="iconComp(route.icon)" size="md" />
            </div>
            <div class="cases-route-head-text">
              <div class="cases-route-label">{{ route.label }}</div>
              <h3 class="cases-route-name">
                {{ route.name }}
                <span class="cases-route-count">{{ route.count }} 例</span>
              </h3>
              <p class="cases-route-desc">{{ route.desc }}</p>
            </div>
          </div>
          <div :class="['cases-route-grid', `grid-${route.cases.length}`]">
            <CaseCard v-for="c in route.cases" :key="c.id" :data="c" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import SectionHead from '../layout/SectionHead.vue'
import CaseCard from '../cards/CaseCard.vue'
import CaseFeatured from '../cards/CaseFeatured.vue'
import { resolveIcon } from '../icons'
import casesData from '../../data/cases.json'

defineProps({ data: { type: Object, required: true } })

const iconComp = (name) => resolveIcon(name)
</script>

<style scoped>
.cases-stats {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
  margin: 40px 0 56px;
  padding: 24px 20px;
  background: linear-gradient(180deg, rgba(79, 143, 255, 0.04) 0%, transparent 100%);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
}

.cases-stat {
  text-align: center;
  padding: 8px 4px;
  position: relative;
}

.cases-stat:not(:last-child)::after {
  content: '';
  position: absolute;
  right: 0;
  top: 20%;
  bottom: 20%;
  width: 1px;
  background: var(--border);
}

.cases-stat-num {
  font-size: 36px;
  font-weight: 700;
  background: var(--gradient);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.1;
  font-family: 'JetBrains Mono', monospace;
  letter-spacing: -0.02em;
}

.cases-stat-suffix {
  font-size: 18px;
  margin-left: 2px;
}

.cases-stat-label {
  font-size: 12px;
  color: var(--text-dim);
  margin-top: 6px;
  letter-spacing: 0.04em;
}

.cases-hero {
  margin-bottom: 64px;
}

.cases-routes {
  display: flex;
  flex-direction: column;
  gap: 56px;
}

.cases-route-head {
  display: flex;
  gap: 18px;
  align-items: flex-start;
  margin-bottom: 24px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--border);
}

.cases-route-head-icon {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: var(--surface);
  border: 1px solid var(--border);
  flex-shrink: 0;
  color: var(--text);
}

.cases-route-head-text {
  flex: 1;
  min-width: 0;
}

.cases-route-label {
  display: inline-block;
  font-size: 11px;
  color: var(--text-dim);
  background: var(--surface-2);
  padding: 2px 8px;
  border-radius: 8px;
  margin-bottom: 6px;
  letter-spacing: 0.04em;
}

.cases-route-name {
  font-size: 22px;
  font-weight: 600;
  color: var(--text);
  margin: 0 0 6px;
  display: flex;
  align-items: baseline;
  gap: 12px;
  letter-spacing: -0.01em;
}

.cases-route-count {
  font-size: 13px;
  font-weight: 500;
  color: var(--cyan);
  font-family: 'JetBrains Mono', monospace;
}

.cases-route-desc {
  font-size: 14px;
  color: var(--text-dim);
  line-height: 1.6;
  margin: 0;
}

/* 业务路线色彩 */
.route-blue .cases-route-head-icon { color: #4f8fff; border-color: rgba(79, 143, 255, 0.3); }
.route-blue .cases-route-count { color: #4f8fff; }

.route-amber .cases-route-head-icon { color: #f59e0b; border-color: rgba(245, 158, 11, 0.3); }
.route-amber .cases-route-count { color: #f59e0b; }

.route-violet .cases-route-head-icon { color: #a78bfa; border-color: rgba(167, 139, 250, 0.3); }
.route-violet .cases-route-count { color: #a78bfa; }

.route-cyan .cases-route-head-icon { color: #00d4ff; border-color: rgba(0, 212, 255, 0.3); }
.route-cyan .cases-route-count { color: #00d4ff; }

.route-emerald .cases-route-head-icon { color: #10b981; border-color: rgba(16, 185, 129, 0.3); }
.route-emerald .cases-route-count { color: #10b981; }

.cases-route-grid {
  display: grid;
  gap: 16px;
}

.grid-6 { grid-template-columns: repeat(3, 1fr); }
.grid-5 { grid-template-columns: repeat(3, 1fr); }
.grid-4 { grid-template-columns: repeat(2, 1fr); }
.grid-3 { grid-template-columns: repeat(3, 1fr); }
.grid-2 { grid-template-columns: repeat(2, 1fr); }
.grid-1 { grid-template-columns: 1fr; }

@media (max-width: 960px) {
  .cases-stats { grid-template-columns: repeat(3, 1fr); }
  .cases-stat:nth-child(3)::after { display: none; }
  .grid-6, .grid-5 { grid-template-columns: repeat(2, 1fr); }
  .grid-4, .grid-3, .grid-2 { grid-template-columns: 1fr; }
}

@media (max-width: 640px) {
  .cases-stats { grid-template-columns: repeat(2, 1fr); }
  .cases-stat::after { display: none !important; }
  .cases-stat-num { font-size: 28px; }
  .grid-6, .grid-5 { grid-template-columns: 1fr; }
  .cases-route-name { font-size: 18px; flex-direction: column; gap: 4px; }
}
</style>
