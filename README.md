# 安道智能 · 公司官网

这是 [andaoai](https://github.com/andaoai) 组织下 **安道智能** 的官方网站，托管在 GitHub Pages。

> 指导数据化，迈向智能化。
> 扎根茂名产业的技术落地者。

## 本地预览

```bash
# 任选其一
python3 -m http.server 8080
# 或
npx serve .
```

浏览器打开 http://localhost:8080

## 部署到 GitHub Pages

1. 推送代码到 `andaoai/andaoai.github.io` 仓库（公司组织下的 `<org>.github.io` 仓库）
2. 仓库 Settings → Pages → Source 选 `main` 分支根目录
3. 访问 `https://andaoai.github.io`

## 文件结构

```
company/
├── index.html      # 单页全部内容
├── style.css       # 样式
└── README.md       # 本文件
```

## 内容结构

- **Hero** — 品牌标语 + 数据概览
- **关于** — 公司定位与价值观
- **团队** — 三位核心成员（CEO / CTO / 技术经理）
- **技术** — 自研核心 + 供应商集成
- **行业** — 茂名产业对位
- **联系** — 商务/技术/项目联系方式

## 演示模式（PPT 播放）

nav 右侧点 **演示** 按钮或按 **P 键** 进入演示模式，每节变成一张幻灯片，自动全屏。

| 快捷键 | 功能 |
|---|---|
| `→` / `Space` / `PageDown` | 下一张 |
| `←` / `PageUp` | 上一张 |
| `Home` / `End` | 第一/最后一张 |
| `1` ~ `6` | 数字键直接跳到指定页 |
| `F` | 切换浏览器全屏 |
| `Esc` | 退出演示模式 |

适合外出给客户讲解公司用，键盘控制不依赖鼠标。

## 技术栈

- 纯 HTML / CSS / JavaScript，零构建
- 字体：Google Fonts (Inter / JetBrains Mono)
- 响应式：桌面 / 平板 / 手机三档断点
- 风格对标 DeepSeek，深色科技感
- 图标：[Lucide](https://lucide.dev) 风格内联 SVG（MIT License），单一 sprite 文件，零外链
