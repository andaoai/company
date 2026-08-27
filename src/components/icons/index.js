// Icon name → Vue component 映射
// JSON 里的 icon 字段（如 "target"、"mail"）通过这里查找到对应组件
import IconTarget from './IconTarget.vue'
import IconCog from './IconCog.vue'
import IconSprout from './IconSprout.vue'
import IconScanEye from './IconScanEye.vue'
import IconBot from './IconBot.vue'
import IconTag from './IconTag.vue'
import IconBriefcase from './IconBriefcase.vue'
import IconFactory from './IconFactory.vue'
import IconCloud from './IconCloud.vue'
import IconCpu from './IconCpu.vue'
import IconPlug from './IconPlug.vue'
import IconMail from './IconMail.vue'
import IconGithub from './IconGithub.vue'
import IconPresent from './IconPresent.vue'
import IconX from './IconX.vue'

export const ICONS = {
  target: IconTarget,
  cog: IconCog,
  sprout: IconSprout,
  'scan-eye': IconScanEye,
  bot: IconBot,
  tag: IconTag,
  briefcase: IconBriefcase,
  factory: IconFactory,
  cloud: IconCloud,
  cpu: IconCpu,
  plug: IconPlug,
  mail: IconMail,
  github: IconGithub,
  present: IconPresent,
  x: IconX,
}

export function resolveIcon(name) {
  return ICONS[name] || null
}
