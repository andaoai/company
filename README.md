# 安道智能 · 公司官网

[andaoai](https://github.com/andaoai) 组织下 **安道智能** 的官方网站，托管在 GitHub Pages。

> 指导数据化，迈向智能化。
> 扎根茂名产业的技术服务商。

🌐 **在线访问**：<https://andaoai.github.io/company/>
🎬 **演示模式（隐藏 PPT 入口）**：<https://andaoai.github.io/company/?present>

## 技术架构

**Vue 3 + Vite** 单页应用，**内容与代码分离**：

- **数据驱动**：所有内容（8 个 section + 网站配置）放在 `src/data/` 的 JSON 文件
- **同一份数据，两个视图**：
  - 普通浏览模式（滚动官网）
  - 演示模式（PPT 16:9 固定画布，URL 加 `#present` 进入）
- **加内容 = 改 JSON**：未来要新增/修改章节，只编辑 `src/data/slides.json`

```
src/
├── data/
│   ├── site.json          # 网站配置：title、logo、nav、footer
│   ├── slides.json        # 10 个 section 入口与标题
│   └── cases.json         # 落地案例数据（5 业务路线 × 16 case）
├── components/
│   ├── layout/            # SiteHeader, SiteFooter, SectionHead
│   ├── sections/          # 9 个 section 组件
│   ├── cards/             # 8 个卡片组件（含 CaseCard / CaseFeatured）
│   ├── icons/             # 15 个自研 SVG 图标（参考 Lucide）
│   └── presenter/         # 演示模式 UI（2 个组件）
├── composables/
│   └── usePresenter.js    # PPT 状态 + 键盘 + URL + resize 监听
├── styles/main.css        # 全局样式（深色科技感）
├── App.vue                # 根组件
└── main.js                # 入口
```

## 本地开发

```bash
npm install          # 装依赖
npm run dev          # 起开发服务器（默认 http://localhost:5173）
npm run build        # 构建到 dist/
npm run preview      # 预览构建产物（默认 http://localhost:4173）
```

## 部署到 GitHub Pages

1. 推送代码到 `andaoai/andaoai.github.io` 仓库（项目位于 `company/` 子目录）
2. CI 自动 build + deploy 到 **<https://andaoai.github.io/company/>**
3. （首次运行）仓库 Settings → Pages → Source 选 **"GitHub Actions"**，workflow 里的 `enablement: true` 会自动启用

## 添加新内容

只需编辑 `src/data/slides.json`，在 `slides` 数组里追加新的 slide 对象：

```json
{
  "id": "new-section",
  "layout": "grid-3",
  "alt": false,
  "kicker": "09 / 新章节",
  "title": "标题",
  "titleAccent": "高亮部分",
  "desc": "可选描述",
  "cards": [
    { "icon": "target", "title": "...", "desc": "..." }
  ]
}
```

8 种可用的 `layout`（无需新组件）：
- `hero` — 品牌首页
- `grid-3` — 3 列卡片
- `grid-3-person` — 3 列人物卡（带头像/标签）
- `grid-4` — 4 列卡片
- `grid-3-contact` — 3 列联系方式
- `grid-2` — 2 列卡片（含开源项目）
- `tech-list` — 单列技术项
- `section-head-only` — 仅标题（用作章节分隔页）
- `cases` — 落地案例（5 业务路线分组，数据来自 `src/data/cases.json`）

15 个可用 `icon`：`target` / `cog` / `sprout` / `scan-eye` / `bot` / `tag` / `briefcase` / `factory` / `cloud` / `cpu` / `plug` / `mail` / `github` / `x` / `present`

> 字段值是**纯文本**（不解析 HTML），保证内容可控。如需富文本，可扩展字段 + `v-html` 渲染。

## 添加新案例

落地案例的数据独立存放在 [`src/data/cases.json`](src/data/cases.json)，与 `slides.json` 分离。结构是 5 大业务路线（看产品/看人/看行为/看工程/看数据）下分组列出 case。

**添加普通 case**：找到对应业务路线，在该路线的 `cases` 数组里追加：

```json
{
  "id": "case-new-2026",
  "title": "新案例标题",
  "client": "客户名（去敏）",
  "clientType": "国企 | 民企 | 内部",
  "industry": "行业",
  "desc": "一句话说明为客户解决了什么问题",
  "period": "时间或维护状态",
  "featured": false
}
```

**改精选 case（hero）**：编辑 `cases.json` 里的 `hero` 对象，至少 3 条 `metrics` 才能撑起视觉。

**改顶部数字带**：编辑 `cases.json` 里的 `stats` 数组，每个元素含 `num` / 可选 `suffix` / `label`。

> 客户名如果不便公开，写"某 + 行业"即可（如"某电池工业企业"）。不要写真实公司名。

## 演示模式（PPT 播放 · 隐藏入口）

普通浏览模式是默认，**仅当 URL 带上入参时自动进入演示模式**：

```
https://andaoai.github.io/company/#present        ← 直接进入
https://andaoai.github.io/company/?present        ← 同效
https://andaoai.github.io/company/?present=1      ← 同效
```

进入后每节变成一张幻灯片，自动请求浏览器全屏（被拒则降级为普通全屏模式）。

| 快捷键 | 功能 |
|---|---|
| `→` / `Space` / `PageDown` | 下一张 |
| `←` / `PageUp` | 上一张 |
| `Home` / `End` | 第一/最后一张 |
| `1` ~ `8` | 数字键直接跳到指定页 |
| `F` | 切换浏览器全屏 |
| `Esc` / 右上角 ✕ | 退出（URL 入参自动清理） |

> **架构**：每张幻灯片是固定 1600×900（16:9）画布，按视口大小整体缩放居中。
> 视口与 16:9 不一致时显示黑边（letterbox / pillarbox）。内容永远在固定坐标系内布局，
> 无论投影仪是 4K、1080p 还是笔记本小窗，幻灯片排版永远一致，永不溢出。

## 10 张幻灯片

1. **Hero** — 品牌标语 + 数据概览（12 客户 / 22 项目 / 2 年运行）
2. **关于** — 公司定位 + 服务对象（茂名国企与民企）
3. **团队** — 三位核心
4. **技术方向（总览）** — 自研 + 集成两条腿
5. **自研核心** — 工业视觉 / Agent 框架 / 数据标注
6. **供应商集成** — CRM / MES / 云基础设施
7. **技术基底** — 已开源项目（go-infer、yolo-label-vs）
8. **落地案例** — 5 业务路线 × 16 个真实项目（精选 + 分组）
9. **行业对位** — 茂名产业
10. **联系** — 商务方式

## 技术栈

- Vue 3（Composition API + `<script setup>`）
- Vite 5（开发服务器 + 构建）
- 纯原生 CSS（无 Tailwind / 无 UI 框架）
- 15 个自研 SVG 图标（参考 Lucide 风格）
- 静态部署：GitHub Pages + GitHub Actions

零外部运行时依赖（除 Vue 3 自身），首屏 gzip 约 39KB。

## 内容规范

**`slides.json`（每个 slide）：**

| 字段 | 类型 | 说明 |
|---|---|---|
| `id` | string | 必填，唯一，小写连字符，会用作 `id="..."` 和 URL hash |
| `layout` | string | 必填，从 8 个允许值中选（含 `cases`） |
| `alt` | boolean | 可选，是否用 `bg-alt` 背景交替 |
| `kicker` / `title` / `titleAccent` / `desc` | string | 标题区域，titleAccent 自动套 `gradient-text` 样式 |
| `cards[].icon` | string | 必填，从 15 个 icon 名中选 |
| `cards[].title` / `desc` | string | 卡片标题和描述 |
| `cards[].items[]` | string[] | （仅 industry）列表项 |
| `members[]` | object | （仅 team）人物对象，含 avatar/role/name/bio/tags |
| `items[]` | object | （仅 tech-list）技术项，含 icon/title/desc/value |
| `actions[]` | object | （仅 hero）按钮，含 label/href/variant |
| `stats[]` | object | （仅 hero）数据卡，含 num/label |
| `meta[]` | object | （仅 contact）底部元信息行 |

**`cases.json`（落地案例，独立文件）：**

| 字段 | 类型 | 说明 |
|---|---|---|
| `stats[]` | object | 顶部数字带元素，含 `num` / `suffix`（可选） / `label` |
| `hero` | object | 精选案例大卡，含 `title` / `client` / `problem` / `solution` / `metrics[]`（≥3 条，含 `value` / `label` / `stage`） |
| `routes[].id` / `name` / `label` | string | 业务路线标识、显示名、徽章标签（如"看产品"） |
| `routes[].icon` | string | 从 15 个 icon 名中选 |
| `routes[].color` | string | `blue` / `amber` / `violet` / `cyan` / `emerald` 之一 |
| `routes[].count` | number | 该路线下 case 数量 |
| `routes[].cases[]` | object | case 对象，含 `id` / `title` / `client` / `clientType` / `industry` / `desc` / `period` / 可选 `featured` |
