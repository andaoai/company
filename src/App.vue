<template>
  <div class="bg-grid"></div>
  <div class="bg-glow"></div>

  <SiteHeader :site="site" :slides="slides" />

  <main>
    <component
      v-for="slide in slides"
      :key="slide.id"
      :is="layoutMap[slide.layout]"
      :data="slide"
    />
  </main>

  <SiteFooter :site="site" />

  <PresenterStage
    :slides="slides"
    :idx="presenter.idx.value"
    :stage-ref="presenter.stageRef"
  />
  <PresenterUI
    :idx="presenter.idx.value"
    :total="presenter.total"
    :exit="presenter.exit"
  />
</template>

<script setup>
import siteData from './data/site.json'
import slidesData from './data/slides.json'
import { layoutMap } from './config/layouts'
import { useScrollSpy } from './composables/useScrollSpy'
import { usePresenter } from './composables/usePresenter'

import SiteHeader from './components/layout/SiteHeader.vue'
import SiteFooter from './components/layout/SiteFooter.vue'
import PresenterStage from './components/presenter/PresenterStage.vue'
import PresenterUI from './components/presenter/PresenterUI.vue'

const site = siteData
const slides = slidesData.slides

const presenter = usePresenter(slides)
useScrollSpy()
</script>
