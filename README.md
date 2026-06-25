# MindGauge — guia de construção (Site 1: Quizzes & Mind Tests)

**Os 16 de 16 testes estão 100% construídos e funcionando.** Abra `index.html` num navegador pra ver o site rodando localmente, sem precisar de servidor — todos os cards da homepage já são links reais, nenhum "coming soon" restante.

## Estrutura de pastas

```
mindgauge/
├── index.html                 → homepage (lista os 16 testes por categoria, todos ativos)
├── about.html                 → página obrigatória do AdSense
├── contact.html                → página obrigatória do AdSense
├── privacy-policy.html        → página obrigatória do AdSense
├── terms-of-service.html      → página obrigatória do AdSense
├── disclaimer.html            → recomendada (resultados não são diagnóstico)
├── robots.txt
├── ads.txt                    → preencha com seu Publisher ID depois da aprovação
├── sitemap.xml                → as 22 páginas (16 testes + 5 institucionais + homepage)
├── DEPLOY.md                  → passo a passo GitHub + Netlify
├── assets/
│   ├── css/style.css          → todo o design do site (não duplique CSS nas páginas)
│   ├── js/main.js             → menu mobile, banner de cookies, helper do gauge
│   ├── js/quiz-engine.js      → motor reutilizável dos quizzes "qual categoria combina com você"
│   ├── js/trivia-engine.js    → motor reutilizável dos quizzes de pergunta-e-resposta
│   ├── speedtest/             → arquivos binários usados pelo Internet Speed Test
│   └── img/                   → coloque aqui favicon.ico e imagens
└── tests/
    ├── _template.html               → DUPLIQUE este arquivo pra criar um teste novo no futuro
    ├── reaction-time-test.html      → ✅
    ├── typing-speed-test.html       → ✅
    ├── internet-speed-test.html     → ✅
    ├── personality-type-quiz.html   → ✅
    ├── love-language-quiz.html      → ✅
    ├── political-compass-test.html  → ✅
    ├── career-aptitude-quiz.html    → ✅
    ├── emotional-intelligence-test.html → ✅
    ├── brain-dominance-test.html    → ✅
    ├── stress-level-test.html       → ✅
    ├── color-blindness-test.html    → ✅
    ├── hearing-frequency-test.html  → ✅
    ├── eye-dominance-test.html      → ✅
    ├── memory-test.html             → ✅
    ├── general-knowledge-quiz.html  → ✅
    └── english-dialect-quiz.html    → ✅ (substitui o "Accent Quiz" original — ver nota abaixo)
```

## Por que "English Dialect Quiz" e não "Accent Quiz"

Um teste de sotaque de verdade precisaria de áudio gravado por falantes nativos reais, que eu não tenho como gerar. Em vez disso, esse teste usa diferenças de **vocabulário** entre EUA/Reino Unido/Austrália/Canadá (ex.: "boot" vs. "trunk") — mesma ideia de "quão bem você conhece as variações do inglês", sem precisar de áudio.

## Checklist antes de aplicar pro AdSense

Os 16 testes já estão prontos — antes de aplicar, falta só:

- [x] 16 testes publicados de verdade
- [ ] Cada página de teste com 150+ palavras de texto único (introdução + metodologia + FAQ) — **não copie e cole o mesmo parágrafo entre páginas**, é exatamente isso que a política de "scaled content abuse" do Google pune
- [ ] `about.html`, `contact.html`, `privacy-policy.html`, `terms-of-service.html` preenchidos com dados reais (substitua todos os `[Your Name]`, `[Month Day, Year]`, `[Your Country/State]`, o e-mail de exemplo, etc.)
- [ ] Site no ar num domínio real há pelo menos algumas semanas antes de aplicar (domínio recém-criado tende a ser rejeitado com mais frequência)
- [ ] `ads.txt` publicado na raiz do domínio (mesmo antes da aprovação, com o Publisher ID — você recebe esse ID ao criar a conta AdSense, antes mesmo de ser aprovado)
- [ ] Site testado no celular (o design já é responsivo, mas teste mesmo assim)
- [ ] Google Search Console configurado e `sitemap.xml` enviado

## Consentimento de cookies (EEA/Reino Unido/Suíça)

O banner em `main.js`/`style.css` é só um **aviso visual básico** — ele NÃO é uma Consent Management Platform (CMP) certificada pelo Google, que é exigida desde 2024 pra qualquer site que sirva anúncios pra usuários da União Europeia, Reino Unido ou Suíça. Antes de ativar anúncios pra esse público:

1. Crie uma conta gratuita numa CMP certificada: [CookieYes](https://www.cookieyes.com), [Cookiebot](https://www.cookiebot.com) ou [Quantcast Choice](https://www.quantcast.com/products/choice-consent-management-platform/) são as mais usadas e têm plano free.
2. Troque o banner atual pelo snippet que a CMP escolhida te der.
3. Configure o Google Consent Mode (a CMP geralmente faz isso automaticamente).

Se seu público for majoritariamente fora da EEA/Reino Unido/Suíça, isso é menos urgente — mas como você pediu público de língua inglesa global, é bem provável que tenha tráfego do Reino Unido, então recomendo não pular esse passo.

## Espaços de anúncio (AdSense)

Já inseri os "espaços reservados" visuais (caixas com fundo listrado e texto "AD PLACEHOLDER") em:
- Homepage: 2 espaços (depois do hero, entre categorias)
- Cada página de teste: 2 espaços (antes da ferramenta, antes do rodapé)

Eles **não carregam nenhum anúncio real** — são só placeholders visuais (`<div class="ad-slot ...">`) pra você já ver onde os anúncios vão entrar e planejar o layout. Quando o AdSense aprovar seu site:
1. No painel do AdSense, crie um "Display ad" (anúncio automático ou de unidade) e copie o código `<ins class="adsbygoogle">...</ins>` que ele gerar.
2. Cole o script principal do AdSense (`<script async src="...adsbygoogle.js?client=ca-pub-...">`) no `<head>` de cada página — já deixei o comentário mostrando onde, em todas as páginas.
3. Troque cada `<div class="ad-slot ...">...</div>` pelo `<ins class="adsbygoogle">` correspondente.

## Motores reutilizáveis

- `assets/js/quiz-engine.js` — compartilhado pelos quizzes "qual categoria combina mais com você": Personality Type Quiz, Brain Dominance Test, Love Language Quiz e Career Aptitude Quiz.
- `assets/js/trivia-engine.js` — compartilhado pelos quizzes de pergunta-e-resposta com 1 alternativa correta: General Knowledge Quiz e English Dialect Quiz.

Se quiser criar um teste novo no mesmo estilo de algum desses no futuro, copie o `<script>` no final da página mais parecida e só troque a lista de perguntas.

## Domínio

Todos os arquivos já usam `https://mindgauge.fyi` (atualizado em 27 arquivos quando você comprou o domínio). Não precisa fazer nenhuma troca manual — só falta apontar o domínio pro Netlify, o que está explicado passo a passo no `DEPLOY.md`.

## Trocar o nome/marca "MindGauge"

"MindGauge" foi o nome de exemplo que usei pra dar uma identidade visual coerente ao protótipo (conceito: instrumento de medição/blueprint). Se quiser manter, ótimo — só verifique se o domínio está disponível. Se quiser outro nome, troque as ocorrências de "MindGauge" no `<title>`, no `.logo` de cada página, no rodapé, e no `og:title`.
