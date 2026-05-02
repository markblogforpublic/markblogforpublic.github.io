# markblogforpublic.github.io

我的个人博客 — 项目展示 & 文章更新。纯静态站点，零构建依赖，中英双语。

> 在线地址：**[markblogforpublic.github.io](https://markblogforpublic.github.io)**

---

## 目录结构

```
📁 blog/
├── index.html                  ← 首页（Hero + 项目卡片）
├── about.html                  ← 关于我（个人介绍 + 免责声明）
├── updates.html                ← 作者更新（文章列表）
├── README.md                   ← 就是这个文件
├── .gitignore
│
├── 📁 posts/                   ← 文章放这里
│   └── hello-world-10-langs.html
│
└── 📁 assets/
    ├── css/
    │   └── style.css           ← MD3 组件样式
    └── js/
        └── main.js             ← 语言切换 + 暗色模式
```

---

## 如何写一篇新文章

### 第一步：在 `posts/` 里创建 HTML 文件

建议直接复制现有文章（比如 `posts/hello-world-10-langs.html`）作为模板，然后修改内容。

**文章页面结构要点：**

| 部分 | 说明 |
|------|------|
| `<head>` 里的 tailwind.config | 保留不动 |
| Top App Bar（导航栏） | 保留不动，注意链接路径要加 `../`（因为文章在子目录） |
| `<article>` 内容区 | 在这里写正文 |
| Back link | 返回按钮 `../updates.html` |
| 文章 header | 标题、分类标签、日期、阅读时长 |
| 正文 | 用 `<div data-lang="en">` 和 `<div data-lang="zh" class="hidden">` 包裹双语内容 |
| Footer | 保留不动 |

**模板示例（最小结构）：**

```html
<!-- 文章 header -->
<header class="mb-10">
  <div class="...inline-flex...rounded-full...bg-tertiary-container...">
    <span class="material-symbols-outlined">article</span>
    <span data-lang="en">Category</span>
    <span data-lang="zh" class="hidden">分类</span>
  </div>
  <h1 class="...text-4xl...font-extrabold...">
    <span data-lang="en">Title</span>
    <span data-lang="zh" class="hidden">标题</span>
  </h1>
  <div class="...text-sm...">
    <span>📅 2026-05-02</span>
    <span>~5 min read</span>
  </div>
</header>

<!-- 正文 -->
<div data-lang="en">
  <p>English content here...</p>
</div>
<div data-lang="zh" class="hidden">
  <p>中文内容在这里...</p>
</div>
```

### 第二步：在 `updates.html` 里添加卡片链接

打开 `updates.html`，在文章列表区（`<div class="space-y-4">` 里面）添加一条新卡片：

```html
<a href="posts/你的文章文件名.html" class="group block m3-card !p-5 hover:!shadow-m3-3 transition-all">
  <div class="flex items-start gap-4">
    <div class="w-12 h-12 rounded-m3-md bg-tertiary-container ...">
      <span class="material-symbols-outlined text-[24px] text-tertiary">图标名</span>
    </div>
    <div class="min-w-0 flex-1">
      <div data-lang="en">
        <h2 class="...">文章英文标题</h2>
        <p class="...">英文简介</p>
      </div>
      <div data-lang="zh" class="hidden">
        <h2 class="...">文章中文标题</h2>
        <p class="...">中文简介</p>
      </div>
      <div class="flex items-center gap-3 mt-3 text-xs ...">
        <span>📅 2026-05-02</span>
        <span>·</span>
        <span class="...rounded-full...">标签</span>
      </div>
    </div>
    <span class="material-symbols-outlined ...">chevron_right</span>
  </div>
</a>
```

### 第三步：上传到 GitHub

把 `posts/` 里的新文件 + 修改后的 `updates.html` 一起推送到仓库。

---

## 如何修改导航栏

导航栏在三个页面里各有一份：`index.html`、`updates.html`、`about.html`。改一个就要同步改另外两个。

每个导航项是一对（英文 + 中文）：

```html
<a href="..." class="nav-link ..." data-lang="en">英文名</a>
<a href="..." class="nav-link ..." data-lang="zh">中文名</a>
```

当前导航：
- **Home / 首页** → `index.html`
- **Updates / 作者更新** → `updates.html`
- **About / 关于** → `about.html`

---

## 中英双语机制

- 所有文本用 `<span data-lang="en">` 或 `<div data-lang="en">` 包英文
- 对应的中文用 `<span data-lang="zh" class="hidden">` 或 `<div data-lang="zh" class="hidden">`
- `main.js` 自动处理切换逻辑，用户选择保存在 `localStorage`

写新内容时记住：
1. 英文和中文都要写
2. 中文元素必须加 `class="hidden"`
3. `data-lang` 属性值只能是 `"en"` 或 `"zh"`

---

## 暗色模式

- 用户点击月亮/太阳图标切换
- 支持三种模式：system → dark → light → 循环
- 偏好保存在 `localStorage`
- 暗色样式用 `.dark:` 前缀（Tailwind 方式）

---

## 样式系统

基于 **Material Design 3**，主要 CSS 类：

| 类名 | 用途 |
|------|------|
| `.m3-card` | 卡片容器 |
| `.m3-filled-btn` | 实心按钮 |
| `.m3-text-btn` | 文字按钮 |
| `.m3-label-btn` | 小型标签按钮（卡片内用） |
| `.m3-chip` | 标签块 |
| `.m3-icon-btn` | 圆形图标按钮 |
| `shadow-m3-1` ~ `shadow-m3-5` | MD3 五级阴影 |
| `rounded-m3-sm/md/lg/xl` | 圆角 |

颜色变量（Tailwind config 中定义）：
- `primary` / `primary-container` / `on-primary`
- `secondary` / `secondary-container`
- `tertiary` / `tertiary-container`
- `surface` / `on-surface` / `on-surface-variant`
- 暗色模式对应 `*-dark` 后缀

---

## 部署

```bash
# 把 blog/ 里的所有文件上传到仓库根目录
# 推送到 main 分支即可
git add .
git commit -m "更新内容"
git push origin main
```

GitHub Pages 会自动部署，等 1-2 分钟就能看到更新。

---

## 可用图标

本博客使用 **Material Symbols** 图标库。所有图标名从这里查：https://fonts.google.com/icons

使用方式：
```html
<span class="material-symbols-outlined">图标名</span>
```

常用图标速查：

| 用途 | 图标名 |
|------|--------|
| 代码 | `code_blocks` |
| 翻译/语言 | `translate` |
| 文章/编辑 | `edit_note`, `article` |
| 图片 | `image` |
| 二维码 | `qr_code_scanner` |
| 箭头 | `arrow_back`, `arrow_downward`, `chevron_right` |
| 日期 | `calendar_today` |
| 时间 | `schedule` |
| 工具 | `handyman` |
| 文件夹 | `folder_open` |
| 语言/地球 | `language` |
| 搜索/探索 | `travel_explore` |
| 警告 | `warning` |
| 信息 | `info` |
| 浅色模式 | `light_mode` |
| 深色模式 | `dark_mode` |
| 菜单 | `menu` |
| 新窗口 | `open_in_new` |
| 描述/文档 | `description` |
