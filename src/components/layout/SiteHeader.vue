<template>
  <header class="nav" :class="{ 'nav-open': menuOpen }">
    <div class="nav-inner">
      <a :href="`#${slides[0]?.id || 'hero'}`" class="logo">
        <span class="logo-mark">{{ site.logo.mark }}</span>
        <span class="logo-text">{{ site.logo.text }}</span>
      </a>
      <nav class="nav-links">
        <a v-for="(n, i) in site.nav" :key="i" :href="n.href">{{ n.label }}</a>
      </nav>
      <a href="#contact" class="nav-cta">合作咨询 →</a>
      <button
        class="nav-toggle"
        :aria-expanded="menuOpen"
        aria-label="切换菜单"
        @click="menuOpen = !menuOpen"
      >
        <span></span><span></span><span></span>
      </button>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

defineProps({ site: { type: Object, required: true }, slides: { type: Array, default: () => [] } })

const menuOpen = ref(false)
function onResize() {
  if (window.innerWidth > 900) menuOpen.value = false
}
onMounted(() => window.addEventListener('resize', onResize))
onUnmounted(() => window.removeEventListener('resize', onResize))
</script>

<style scoped>
.nav-open .nav-links {
  display: flex;
}
</style>
