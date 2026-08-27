<template>
  <footer class="footer">
    <div class="container footer-inner">
      <div class="footer-left">
        <span class="logo-mark">{{ site.logo.mark }}</span>
        <span>{{ site.footer.copyright }}</span>
      </div>
      <div class="footer-right">
        <template v-for="(l, i) in site.footer.links" :key="i">
          <a
            :href="l.href"
            :target="l.external ? '_blank' : undefined"
            :rel="l.external ? 'noopener' : undefined"
          >
            <IconGithub v-if="l.icon === 'github'" size="xs" />
            {{ l.label }}
          </a>
          <span v-if="i < site.footer.links.length - 1">·</span>
        </template>
      </div>
    </div>
  </footer>
</template>

<script setup>
import IconGithub from '../icons/IconGithub.vue'
defineProps({ site: { type: Object, required: true } })
</script>
