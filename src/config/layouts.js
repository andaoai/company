// 布局名 → section 组件 的唯一映射表
// App.vue（普通模式）与 PresenterStage.vue（演示模式）共用，避免两处各写一份
import HeroSection from '../components/sections/HeroSection.vue'
import AboutSection from '../components/sections/AboutSection.vue'
import TeamSection from '../components/sections/TeamSection.vue'
import TechSection from '../components/sections/TechSection.vue'
import TechBaseSection from '../components/sections/TechBaseSection.vue'
import ServiceSection from '../components/sections/ServiceSection.vue'
import IndustrySection from '../components/sections/IndustrySection.vue'
import ContactSection from '../components/sections/ContactSection.vue'
import SectionHeadOnly from '../components/sections/SectionHeadOnly.vue'
import CasesSection from '../components/sections/CasesSection.vue'

export const layoutMap = {
  hero: HeroSection,
  'grid-3': AboutSection,
  'grid-3-person': TeamSection,
  'grid-4': IndustrySection,
  'grid-3-contact': ContactSection,
  'grid-2': TechBaseSection,
  'tech-list': TechSection,
  'service-grid': ServiceSection,
  'section-head-only': SectionHeadOnly,
  cases: CasesSection,
}
