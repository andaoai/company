<template>
  <div class="tech-base-card">
    <div class="card-icon">
      <component :is="iconComp" size="md" />
    </div>
    <h3>{{ data.title }}</h3>
    <div v-if="data.problem" class="tech-problem">
      <span class="problem-label">解决什么问题</span>
      <p>{{ data.problem }}</p>
    </div>
    <p v-if="data.value" class="tech-value-text">{{ data.value }}</p>
    <div class="tech-meta">
      <span v-if="data.tag" class="tech-tag">{{ data.tag }}</span>
      <span v-if="data.softCopyright" class="tech-softcopy">
        <IconMail size="xs" />
        软著申请中
      </span>
    </div>
    <a v-if="data.url" :href="data.url" target="_blank" rel="noopener" class="tech-url">
      <IconGithub size="xs" />
      查看 GitHub 仓库
    </a>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { resolveIcon } from '../icons'
import IconGithub from '../icons/IconGithub.vue'
import IconMail from '../icons/IconMail.vue'

const props = defineProps({ data: { type: Object, required: true } })
const iconComp = computed(() => resolveIcon(props.data.icon))
</script>
