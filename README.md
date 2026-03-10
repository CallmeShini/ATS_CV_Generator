<div align="center">
<p align="center">
  <b>🇧🇷 Português (PT-BR)</b> |
  <a href="./README.en.md">🇺🇸 English</a> |
  <a href="./README.zh-CN.md">🇨🇳 简体中文 (ZH-CN)</a>
</p>

# ✨ Gerador de Currículo ATS
**Um motor de adaptação de currículos via IA (Copilot), focado em privacidade e puramente local.**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Playwright](https://img.shields.io/badge/Playwright-Tested-green?style=for-the-badge&logo=playwright)](https://playwright.dev/)
[![Zustand](https://img.shields.io/badge/State-Zustand-brown?style=for-the-badge&logo=react)](https://zustand-demo.pmnd.rs/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

[Testar Demo (Vercel)](https://atscv-kohl.vercel.app/) · [Reportar Bug](https://github.com/CallmeShini/ATS_CV_Generator/issues) · [Sugerir Feature](https://github.com/CallmeShini/ATS_CV_Generator/issues)

</div>

---

## 📖 Visão Geral

O **Gerador de Currículo ATS** é um aplicativo web moderno de alta performance projetado para resolver um problema crítico dos candidatos a vagas: ultrapassar os Sistemas de Rastreamento de Candidatos (ATS). Ao fornecer um "Perfil Mestre" (Master Profile) salvo localmente na sua máquina e colar a Descrição de uma Vaga Alvo, este motor utiliza recursos avançados de LLMs (Inteligência Artificial) para extrair, sintetizar e reordenar suas experiências num PDF de alto contraste focado na legibilidade rigorosa, garantindo **100% de match nos parsers ATS do mercado**.

Diferente de geradores comerciais, seus dados **nunca trafegam ou ficam salvos num banco de dados**. Eles vivem unicamente dentro do seu navegador (client-storage), utilizando encriptação padrão militar e garantindo a máxima privacidade da sua trajetória pessoal.

## 🚀 Principais Funcionalidades

- 🧠 **Armazenamento Encapsulado**: Seu "Perfil Mestre" (experiências, educação, skills) é salvo de maneira persistente e criptografado com `crypto-js` via estado global do `Zustand`. Sem vazamentos (Data-Leaks).
- ✨ **Adaptação Orientada por IA**: Integra de forma profunda com Modelos de Linguagem baseados em raciocínio via API (Groq Llama 3 ou Google Gemini) que seletivamente reordenam a relevância da sua carreira conforme a vaga colada.
- 🖨️ **Motor de Renderização de PDF**: Impressão que abandona libs gráficas e foca num motor nativo de `@print` por CSS Modules semânticos. Zero SVG ou Canvas. Ele preza pela leitura das IAs de HR (Gupy, Greenhouse, etc).
- 🛡️ **SecOps (Blindado)**: Endpoints fortificados contra *Prompt Injections* passivas, injeções arbitrárias de payload contidos na requisição (usando `Zod` no server-side) e mitigação contra ataques DDoS ou manipulação de bots pela Edge Network através de limitação de acesso (`Upstash` Rate Limiting).
- 🎨 **Estética Monocromática Minimalista**: Um Design System moderno inspirado em jornais analógicos que abandona os preenchimentos em prol do foco severo e refinado na tipografia e separação visual baseada em "White Spaces" do layout.

## 🛠️ Arquitetura Técnica

| Domínio | Tecnologia | Descrição |
| :--- | :--- | :--- |
| **Framework** | Next.js 15 (App Router) | Responsável pela navegação robusta, server endpoints e roteamento veloz. |
| **Linguagem** | TypeScript | Checagem de tipo estrito em todas as variáveis locais. |
| **State Manager** | Zustand | Gestão leve baseada em hooks reativos usando um middleware nativo de Storage |
| **Styling** | Vanilla CSS Modules | Arquivos de estilos exclusivos voltados para formatação impecável de Papel (A4) |
| **Validação** | Zod | Proteção severa da integridade dos objetos JSON circulantes. |
| **Segurança** | CryptoJS & Upstash | Encriptação simétrica via client-side (AES) e Limite de Throttle por tráfego no Node |
| **Automação** | Playwright | Pipeline de End-to-End local para varrer interações sistêmicas da GUI |

## 💻 Rodando Localmente

### Dependências Iniciais
- Node.js (v18+)
- Uma chave ativa de Token/API ou do modelo do [Groq](https://console.groq.com/) ou [Google Gemini](https://ai.google.dev/).
- (Opcional, visando infraestrutura) Um Token URL redis hospedado de forma free pelo [Upstash](https://upstash.com/).

### Como Iniciar

1. **Clone o Repositório:**
   ```bash
   git clone https://github.com/CallmeShini/ATS_CV_Generator.git
   cd ATS_CV_Generator
   ```

2. **Baixe os Pacotes Node:**
   ```bash
   npm install
   ```

3. **Crie suas Environment Variables:**
   Crie um arquivo invisível chamado `.env.local` na pasta raiz e adiciones as tags secretas de sua escolha:
   ```env
   # Execução LLM Target (Basta ter ao menos um configurado pra rota correta responder)
   GROQ_API_KEY=sua_groq_api_key_here
   GEMINI_API_KEY=sua_gemini_api_key_here

   # Cota de Bloqueio
   UPSTASH_REDIS_REST_URL=sua_upstash_url
   UPSTASH_REDIS_REST_TOKEN=seu_upstash_token

   # Chave Secreta de Local Storage AES (Qualquer key aleatória segura)
   NEXT_PUBLIC_STORAGE_SECRET=uma_chave_segura_de_no_minimo_64_bits
   ```

4. **Inicialize a Esteira de Desenvolvimento Frontend:**
   ```bash
   npm run dev
   ```
   *O portal agora estará ouvindo pacotes nas portas locais, acessível no sub-domínio em [http://localhost:3000](http://localhost:3000).*

## 🧪 Infraestrutura QA (Rodando os Testes)

Sinta-se à vontade para auditar as regras e views testadas da automação visual que foi desenhada no arquivo `playwright.config.ts`.
```bash
# Rodar na shell a action:
npm run test:e2e
```

## 🔒 Compromisso de Segurança 
Qualquer arquivo gerado local ou cloud segue normativas de Data Privacy. Os hooks não lecionam nem leem sua tela com bibliotecas não seguras e nem vazam seu nome. A camada local criptografada blinda cookies caso venha porventura ocorrer alguma XSS no seu Chrome. Todo o matching é roteado do lado reativo e morto dos componentes do Back-end.

## 🤝 Quer contribuir?
Modificações são e sempre serão altamente bem-vindas (Issues ou Pull Requests). Mapeie suas branchs e suba sugestões na [página principal de tracking](https://github.com/CallmeShini/ATS_CV_Generator/issues).

---
<div align="center">
  <i>Desenvolvido e encriptado de forma limpa por <b>Shini</b>.</i>
</div>
