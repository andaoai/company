// 案例图片解析
// ----------------------------------------------------------------
// 约定：图片按 case 的 id 命名，放在 src/assets/cases/。
//   - 真实图优先：<id>.jpg / .jpeg / .png / .webp / .avif
//   - 临时占位图兜底：<id>.svg（由 scripts/gen_case_placeholders.py 生成）
//   - 全都没有时：default.svg（通用兜底）
//
// 后期补充真实图片的方法：
//   把真实照片命名为 <id>.jpg（如 ocr-test.jpg）丢进 src/assets/cases/ 即可，
//   无需改任何组件代码，重新 build 后自动生效。
//
// 特例：case 数据里显式写了 "image" 字段（如 "/cases/foo.jpg"），以该字段为准。
import defaultImg from '../assets/cases/default.svg'

// eager 收集目录下所有图片，得到 “文件名（不含扩展名） → URL” 映射
const modules = import.meta.glob('../assets/cases/*.{svg,jpg,jpeg,png,webp,avif,gif}', {
  eager: true,
  query: '?url',
  import: 'default',
})

// 真实图（位图）与占位图（svg）分开存，解析时真实图优先
const photos = {}
const svgs = {}
for (const [path, url] of Object.entries(modules)) {
  const file = path.split('/').pop()
  const base = file.replace(/\.[^.]+$/, '')
  if (file.toLowerCase().endsWith('.svg')) svgs[base] = url
  else photos[base] = url
}

/**
 * 取案例图片 URL
 * @param {string} id case 的 id
 * @param {string} [explicit] 数据里显式指定的图片路径（优先级最高）
 * @returns {string}
 */
export function caseImage(id, explicit) {
  if (explicit) return explicit
  return photos[id] || svgs[id] || defaultImg
}
