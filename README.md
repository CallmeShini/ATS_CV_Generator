# Gerador de Currículo ATS (Open-Source 1.0)

Este é um projeto de código aberto desenvolvido em **Next.js** focado em adaptar o seu perfil profissional (Master Profile) contra descrições de vagas de emprego, gerando automaticamente PDFs de currículos perfeitamente formatados para passar pelos filtros automáticos de recrutamento (ATS).

## 🚀 Funcionalidades

- 🧠 **Master Profile Local**: Gerencie todos os seus dados e experiências na aplicação. Os dados ficam salvos no seu browser (Zustand com localStorage).
- ✨ **Adaptação Inteligente (JSON/API)**: Permite alinhar as suas skills listadas, cargo e resumo profissional diretamente aos termos da vaga.
- 🖨️ **Exportação PDF 100% ATS Safe**: Construído via `window.print()` e `CSS @print`, removendo rodapés de navegadores, ajustando perfeitamente as margens do arquivo A4 para ser legível por todos os robôs de gupy, greenhouse etc.
- 🎨 **Visual High-End Minimalista**: Baseado num padrão testado em mercado (referência gringa), focado na clareza absoluta da tipografia.

## 🛠️ Tecnologias Utilizadas

- **React / Next.js (App Router)**
- **TypeScript**
- **Zustand** (Gerenciamento de Estado Global do Perfil Principal)
- **CSS Modules Vainilla** (Sem frameworks complexos de CSS para evitar bugs de quebra de página durante a impressão em PDF).

## 📦 Como rodar localmente

```bash
# 1. Instale as dependências
npm install

# 2. Inicie o servidor de desenvolvimento
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

---

*Repositório recém iniciado para a escalada até a Versão 1.0 Pública.*
