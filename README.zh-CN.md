<div align="center">
<p align="center">
  <a href="./README.md">🇧🇷 Português (PT-BR)</a> |
  <a href="./README.en.md">🇺🇸 English</a> |
  <b>🇨🇳 简体中文 (ZH-CN)</b>
</p>

# ✨ ATS简历生成器 (ATS CV Generator)
**一个隐私优先、100%纯本地执行的AI简历适配引擎。**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Playwright](https://img.shields.io/badge/Playwright-Tested-green?style=for-the-badge&logo=playwright)](https://playwright.dev/)
[![Zustand](https://img.shields.io/badge/State-Zustand-brown?style=for-the-badge&logo=react)](https://zustand-demo.pmnd.rs/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

[体验在线演示](https://atscv-kohl.vercel.app/) · [报告问题](https://github.com/CallmeShini/ATS_CV_Generator/issues) · [请求功能](https://github.com/CallmeShini/ATS_CV_Generator/issues)

</div>

---

## 📖 概览

**ATS CV Generator** 是一个现代的、高性能的Web应用，旨在解决求职者的一个关键问题：通过自动化的ATS（申请人跟踪系统）。 您只需在本地提供您的“主档案 (Master Profile)”，并粘贴目标职位的描述，该引擎就会使用先进的LLM（大型语言模型）解析它，提炼并自动排版一份专门为了在ATS解析器中得分达到 100% 而设计的高对比度、黑白简约的 PDF 简历。

与标准简历生成器不同的是，您的数据永远不会驻留或上传到任何中央服务器数据库中。 所有的信息都完全利用AES军用级加密保存在您浏览器的本地存储中，确保最高的隐私安全性。

## 🚀 核心功能

- 🧠 **加密的本地存储**: 您的“主档案”（工作经验、学历、技能）被持久化地安全保存在您的浏览器本地，并通过 `crypto-js` 和 `Zustand` 加密。数据绝不泄露给任何用户追踪库。
- ✨ **AI驱动简历适配**: 与高级推断模型（Groq Llama 3 / Google Gemini）无缝集成，根据粘贴的目标职位描述严格且选择性地分析、筛选和重新排序您的主要经验。
- 🖨️ **100% ATS安全 PDF引擎**: 使用CSS原生的 `@print` 配合语义化HTML，生成出完全机器可读的PDF。没有多余的Canvas，没有容易出错的SVG节点，没有错乱的排版断点。我们只保证最纯粹的可读性。
- 🛡️ **DevSecOps安全加固**: 通过 `Upstash` 边缘速率限制和 `Zod` 的严格负载验证，防止提示词注入攻击 (Prompt Injections)、跨站请求伪造 (CSRF) 和拒绝服务/消耗服务攻击 (Denial of Wallet)。
- 🎨 **极简主义单色美学**: 一套出色且受编辑报纸启发的黑白设计系统，这套系统完全专注于排版和视觉层次，确保您的内容永远大于花哨的布局。

## 🛠️ 技术栈与架构

| 模块 | 技术 | 描述 |
| :--- | :--- | :--- |
| **框架** | Next.js 15 (App Router) | 提供超高性能的服务端路由机制 |
| **语言** | TypeScript | 全环境的严格安全类型检查 |
| **状态管理** | Zustand | 轻量级状态管理配合缓存持久化中间件 |
| **样式库** | Vanilla CSS Modules | 极简化组件样式，同时保证印刷排版的绝对对齐 |
| **数据校验** | Zod | 定义 Schema 后端以确保解析出无懈可击的API负载 |
| **应用安全** | CryptoJS & Upstash | 客户端浏览器AES对称加密，以及Node级别的访问Redis防刷流控 |
| **自动化测试** | Playwright | 用于执行UI和接口稳定性的端到端自动化测试 |

## 💻 本地运行部署

### 相关要求
- Node.js `v18.x` 或以上版本。
- 获取来自 [Groq](https://console.groq.com/) 或者 [Google Gemini](https://ai.google.dev/) 开启的大语言模型API密钥。
- （可选但强烈推荐）获取来自 [Upstash](https://upstash.com/) 的免费Redis URL和密钥用来配置速率限制器。

### 安装步骤

1. **克隆代码仓库:**
   ```bash
   git clone https://github.com/CallmeShini/ATS_CV_Generator.git
   cd ATS_CV_Generator
   ```

2. **安装所有的依赖信息:**
   ```bash
   npm install
   ```

3. **设置运行环境变量:**
   在您的根目录下建立一个秘密文件 `.env.local` 并在其中注入您的Key信息:
   ```env
   # 大型语言模型的执行入口 (填一个即可)
   GROQ_API_KEY=your_groq_api_key_here
   GEMINI_API_KEY=your_gemini_api_key_here

   # 速率限制配置 (为了抵御大量机器人恶意消耗AI API代币)
   UPSTASH_REDIS_REST_URL=your_upstash_url
   UPSTASH_REDIS_REST_TOKEN=your_upstash_token

   # 客户端浏览器本地存储数据的安全主加密锁
   NEXT_PUBLIC_STORAGE_SECRET=a_secure_random_string_here_like_military_pass
   ```

4. **启动开发服务器:**
   ```bash
   npm run dev
   ```
   *应用程序现在已运行并可访问: [http://localhost:3000](http://localhost:3000)*

## 🧪 自动化测试通道

该应用为了CI/CD的完整性和自动验证预捆绑了Playwright工具链：

```bash
# 启动质量保证流水线：
npm run test:e2e
```

## 🔒 隐私安全申明
- 所有与GPT或是Groq大模型通讯的请求全部在你的Next.js服务器侧边无痕执行，不会向用户浏览器透露API私钥或追踪代码；
- 对于后端接收的文本输入做过严格的反注入防护模型设计；
- 应用内的“状态信息”采用了对称加密法加密保存在缓存之中。

## 🤝 开源贡献
欢迎任何类型的漏洞反馈和PR合并！请随时检查本项目的 [Issues追踪页](https://github.com/CallmeShini/ATS_CV_Generator/issues)。

---
<div align="center">
  <i>Developed and hardened by <b>Shini</b>.</i>
</div>
