<template>
  <div :class="['case-card', { 'case-card-featured': data.featured }]">
    <!-- 案例缩略图（临时占位图，后期替换真实图无需改本组件） -->
    <div class="case-thumb">
      <img :src="img" :alt="data.title" loading="lazy" decoding="async" />
      <span :class="['case-type', `case-type-${typeClass}`]">
        {{ data.clientType }}
      </span>
    </div>

    <div class="case-body">
      <span class="case-industry">{{ data.industry }}</span>
      <h4 class="case-title">{{ data.title }}</h4>
      <p class="case-desc">{{ data.desc }}</p>
      <div class="case-foot">
        <span class="case-client">{{ data.client }}</span>
        <span class="case-period">{{ data.period }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { caseImage } from '../../utils/caseImages'

const props = defineProps({ data: { type: Object, required: true } })

// 客户类型 → 样式类：国企 soe / 民企 private / 内部 internal
const TYPE_CLASS = { 国企: 'soe', 民企: 'private', 内部: 'internal' }
const typeClass = computed(() => TYPE_CLASS[props.data.clientType] ?? 'private')

const img = computed(() => caseImage(props.data.id, props.data.image))
</script>

<style scoped>
.case-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  display: flex;
  flex-direction: column;
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
  z-index: 2;
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

/* ---- 缩略图 ---- */
.case-thumb {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: var(--bg-alt);
  flex-shrink: 0;
}

.case-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.4s ease;
}

.case-card:hover .case-thumb img {
  transform: scale(1.05);
}

.case-type {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 10px;
  font-weight: 500;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

.case-type-soe {
  color: #c6c6d4;
  background: rgba(20, 20, 30, 0.65);
  border: 1px solid rgba(138, 138, 158, 0.4);
}

.case-type-private {
  color: #bcd4ff;
  background: rgba(20, 30, 55, 0.65);
  border: 1px solid rgba(79, 143, 255, 0.45);
}

.case-type-internal {
  color: #d6c9ff;
  background: rgba(35, 25, 60, 0.65);
  border: 1px solid rgba(167, 139, 250, 0.45);
}

/* ---- 正文 ---- */
.case-body {
  padding: 18px 20px 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
}

.case-industry {
  font-size: 12px;
  color: var(--text-dim);
  letter-spacing: 0.02em;
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
