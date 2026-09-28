#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
生成案例临时占位图（SVG）。
用法：python3 scripts/gen_case_placeholders.py
以后有真实图：把同名 .jpg/.png 放进 src/assets/cases/ 即可，组件优先使用真实图。
"""
import pathlib

OUT = pathlib.Path(__file__).resolve().parent.parent / "src" / "assets" / "cases"

# 业务路线配色（与 CasesSection 的 route-* 一致）
BLUE, AMBER, VIOLET, CYAN, EMERALD = "#4f8fff", "#f59e0b", "#a78bfa", "#00d4ff", "#10b981"

# Lucide 风格 24×24 图标路径（与 src/components/icons 同源）
ICON_PATHS = {
    "scan-eye": (
        '<path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/>'
        '<path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/>'
        '<circle cx="12" cy="12" r="3"/>'
    ),
    "target": (
        '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>'
    ),
    "factory": (
        '<path d="M2 20V8l5 4V8l5 4V8l5 4V4h3v16z"/><path d="M6 16h2M11 16h2M16 16h2"/>'
    ),
    "cog": (
        '<circle cx="12" cy="12" r="3"/>'
        '<path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 '
        '1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1 '
        '-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 '
        '9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 '
        '-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06 '
        '-.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>'
    ),
    "cloud": '<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>',
    "image": (
        '<rect x="3" y="3" width="18" height="18" rx="2"/>'
        '<circle cx="9" cy="9" r="2"/><path d="m21 15-3.5-3.5L8 21"/>'
    ),
}

# (id, 图标, 颜色, 标题, 行业标签)
CASES = [
    # hero 精选（与 cases.json hero.id 一致，注意 id 带 case- 前缀）
    ("case-yema-violation", "scan-eye", BLUE, "智慧交通车辆违停自动抓拍", "智慧交通"),
    # 看产品 · 工业视觉质量检测（blue）
    ("sfiss-wheel", "scan-eye", BLUE, "汽车轮毂表面缺陷检测", "汽车零部件"),
    ("lyo-bottle", "scan-eye", BLUE, "冻干瓶（西林瓶）缺陷检测", "医药包装"),
    ("weld-defect", "scan-eye", BLUE, "钢结构焊缝缺陷检测", "建筑 / 钢结构"),
    ("surface-general", "scan-eye", BLUE, "通用工业表面瑕疵检测", "工业制造"),
    ("vacuum-parts", "scan-eye", BLUE, "家电配件缺漏检测", "家电制造"),
    ("ring-oil", "scan-eye", BLUE, "胶圈 + 机油尺自动检测", "机械装备"),
    # 看人 · 工地安全合规（amber）
    ("site-edge", "target", AMBER, "工地安全合规端侧检测", "建筑工地"),
    ("site-stream", "target", AMBER, "工地摄像头实时视频流分析", "建筑工地"),
    ("site-edge-model", "target", AMBER, "安全合规检测模型训练", "建筑工地"),
    # 看行为 · 工厂行为合规（violet）
    ("yema-violation", "factory", VIOLET, "工厂 5 大违规行为综合检测", "电池工业"),
    ("violation-models", "factory", VIOLET, "5 大违规行为检测模型训练", "电池工业"),
    # 看工程 · 建筑监理辅助（cyan）
    ("rebar-density", "cog", CYAN, "钢筋绑扎密度检测", "建筑 / 监理"),
    # 看数据 · 工业数据采集与上报（emerald）
    ("ocr-test", "cloud", EMERALD, "测试数据 OCR 自动采集", "工业数字化"),
    ("image-sync", "cloud", EMERALD, "拍照 + AI 识别工件身份", "工业制造"),
    ("viz-platform", "cloud", EMERALD, "通用数据可视化平台搭建", "工业数字化"),
]

TEMPLATE = """<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360" viewBox="0 0 640 360">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="{color}" stop-opacity="0.22"/>
      <stop offset="1" stop-color="{color}" stop-opacity="0.04"/>
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M40 0H0V40" fill="none" stroke="{color}" stroke-opacity="0.10" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="640" height="360" fill="#0d0d1a"/>
  <rect width="640" height="360" fill="url(#grid)"/>
  <rect width="640" height="360" fill="url(#g)"/>
  <rect x="0.5" y="0.5" width="639" height="359" fill="none" stroke="{color}" stroke-opacity="0.35"/>
  <g transform="translate(292 78) scale(6.5)" fill="none" stroke="{color}" stroke-width="1.4"
     stroke-linecap="round" stroke-linejoin="round">{icon}</g>
  <text x="320" y="262" text-anchor="middle" font-family="PingFang SC, Microsoft YaHei, sans-serif"
     font-size="26" font-weight="600" fill="#e8e8f0">{title}</text>
  <text x="320" y="296" text-anchor="middle" font-family="PingFang SC, Microsoft YaHei, sans-serif"
     font-size="15" fill="#8a8a9e">{industry} · 项目现场图</text>
  <text x="320" y="326" text-anchor="middle" font-family="PingFang SC, Microsoft YaHei, sans-serif"
     font-size="12" fill="#5a5a6e">临时占位图 · 后期替换为真实图片</text>
</svg>
"""


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    seen = set()
    for cid, icon, color, title, industry in CASES:
        if cid in seen:
            continue
        seen.add(cid)
        svg = TEMPLATE.format(color=color, icon=ICON_PATHS[icon], title=title, industry=industry)
        (OUT / f"{cid}.svg").write_text(svg, encoding="utf-8")

    # 通用兜底图（default.svg）：用于没有按 id 找到图片的 case
    default_svg = TEMPLATE.format(
        color="#4f8fff", icon=ICON_PATHS["image"], title="项目现场图", industry="安道智能"
    )
    # 兜底图不显示“替换为真实图片”提示行，改成更中性的文案
    default_svg = default_svg.replace("临时占位图 · 后期替换为真实图片", "ANDAO AI · INDUSTRIAL INTELLIGENCE")
    (OUT / "default.svg").write_text(default_svg, encoding="utf-8")

    print(f"生成 {len(seen)} 个占位图 + default.svg → {OUT}")


if __name__ == "__main__":
    main()
