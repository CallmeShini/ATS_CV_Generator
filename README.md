<div align="center">

# ✨ ATS CV Generator
**A privacy-first, purely local, AI-powered resume adaptation engine.**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Playwright](https://img.shields.io/badge/Playwright-Tested-green?style=for-the-badge&logo=playwright)](https://playwright.dev/)
[![Zustand](https://img.shields.io/badge/State-Zustand-brown?style=for-the-badge&logo=react)](https://zustand-demo.pmnd.rs/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

[View Live Demo](https://atscv-kohl.vercel.app/) · [Report Bug](https://github.com/CallmeShini/ATS_CV_Generator/issues) · [Request Feature](https://github.com/CallmeShini/ATS_CV_Generator/issues)

</div>

---

## 📖 Overview

The **ATS CV Generator** is a modern, high-performance web application designed to solve a critical problem for job seekers: bypassing automated Applicant Tracking Systems (ATS). By providing a localized "Master Profile" and pasting a target Job Description, this engine utilizes advanced LLM parsing to synthesize and optimize a perfectly formatted, high-contrast, strictly monochrome PDF resume engineered specifically to score 100% in ATS parsers.

Unlike standard resume builders, your data never resides on a central database. It lives entirely in your browser's local storage utilizing AES military-grade encryption, ensuring maximum privacy.

## 🚀 Key Features

- 🧠 **Encrypted localized Storage**: Your "Master Profile" (experiences, education, skills) is securely persisted in your browser's local storage and encrypted via `crypto-js` and `Zustand`. Data never leaks to a user database.
- ✨ **AI-Powered Adaptation**: Integrates seamlessly with advanced Language Models (Groq Llama 3 / Google Gemini) to selectively filter and re-rank your master experiences based strictly on the provided Job Description.
- 🖨️ **100% ATS-Safe PDF Engine**: Uses native CSS `@print` directives combined with semantic HTML to generate machine-readable PDFs. No Canvas, no complex SVGs, no layout breaks. Just raw readability.
- 🛡️ **DevSecOps Hardened**: Protected against Prompt Injections, Cross-Site Request Forgery (CSRF), and Denial of Wallet attacks via `Upstash` Edge Rate Limiting and strict `Zod` payload validation schemas.
- 🎨 **Minimalist Monochrome Aesthetics**: A beautiful, editorial-inspired high-contrast design system focused entirely on typography and visual hierarchy, ensuring your content speaks louder than the layout.

## 🛠️ Architecture & Tech Stack

| Domain | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | Next.js 15 (App Router) | React framework built for high performance and optimal server-side routing |
| **Language** | TypeScript | Strict type-safety across all environments |
| **State Management** | Zustand | Lightweight, unopinionated state management with persistent middleware |
| **Styling** | Vanilla CSS Modules | Minimalist, robust styling ensuring accurate print media generation |
| **Data Validation** | Zod | Schema declarations and validation for impenetrable API payloads |
| **Security** | CryptoJS & Upstash | Client-side AES encryption and Edge-level Redis rate formatting |
| **Testing** | Playwright | Robust End-to-End browser UI automation testing |

## 💻 Running Locally

### Prerequisites
- Node.js `v18.x` or later
- An active API key from [Groq](https://console.groq.com/) or [Google Gemini](https://ai.google.dev/).
- An active Redis database URL/Token from [Upstash](https://upstash.com/) (Optional, for Rate Limits).

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/CallmeShini/ATS_CV_Generator.git
   cd ATS_CV_Generator
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Create a `.env.local` file in the root directory and add the following keys:
   ```env
   # LLM Execution
   GROQ_API_KEY=your_groq_api_key_here
   GEMINI_API_KEY=your_gemini_api_key_here

   # Rate Limiting (Optional but recommended for production)
   UPSTASH_REDIS_REST_URL=your_upstash_url
   UPSTASH_REDIS_REST_TOKEN=your_upstash_token

   # Client Storage Encryption
   NEXT_PUBLIC_STORAGE_SECRET=a_secure_random_string_here
   ```

4. **Spin up the development server:**
   ```bash
   npm run dev
   ```
   *The application will be running at [http://localhost:3000](http://localhost:3000).*

## 🧪 Running Tests

This application is bundled with automated End-to-End testing via Playwright to guarantee CI/CD reliability.

```bash
# Execute the QA pipeline
npm run test:e2e
```

## 🔒 Security Statement
We take privacy and platform security seriously. 
- All API interactions happen strictly server-side; client API keys are never exposed.
- Input models are protected against prompt leakage and JSON parse disruption.
- Client state is obfuscated locally, requiring strict symmetric decryption to be readable.

## 🤝 Contributing
Contributions, issues, and feature requests are welcome!
Feel free to check the [issues page](https://github.com/CallmeShini/ATS_CV_Generator/issues).

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---
<div align="center">
  <i>Developed and hardened by <b>Shini</b>.</i>
</div>
