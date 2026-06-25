# Como colocar o MindGauge no ar — guia completo (mindgauge.fyi)

Esse guia assume que você nunca usou GitHub nem Netlify. Tudo aqui é clicável, no navegador — nenhuma linha de comando. São 3 partes: **GitHub** (guardar os arquivos) → **Netlify** (publicar o site) → **domínio** (apontar mindgauge.fyi pro site).

---

## PARTE 1 — GitHub: guardar os arquivos do site

### 1.1 Criar a conta
1. Acesse **github.com**
2. Clique em **Sign up** (canto superior direito)
3. Siga o cadastro (e-mail, senha, nome de usuário) — é grátis

### 1.2 Criar o repositório
1. Já logado, clique no **+** no canto superior direito → **New repository**
2. **Repository name**: digite `mindgauge`
3. Deixe marcado **Public**
4. **Não** marque nenhuma caixinha (nem "Add a README", nem ".gitignore", nem "license") — já temos esses arquivos
5. Clique no botão verde **Create repository**

### 1.3 Subir os arquivos
1. Na página do repositório (que vai aparecer vazia, com instruções), procure o link **uploading an existing file** no meio do texto — clique nele. (Se não aparecer esse link, procure o botão **Add file** → **Upload files**)
2. No seu computador, abra a pasta `mindgauge` que veio dentro do zip que te entreguei
3. **Importante:** selecione TUDO que está **dentro** da pasta `mindgauge` — o arquivo `index.html`, as pastas `assets` e `tests`, todos os outros arquivos `.html`, `.txt`, `.xml`, `.md`. Selecione tudo (Ctrl+A no Windows / Cmd+A no Mac dentro da pasta) e arraste pra área de upload do GitHub.
   - ⚠️ **Não** arraste a pasta `mindgauge` em si — arraste o que está **dentro** dela. Se a pasta virar uma subpasta no repositório, o site vai ficar no endereço errado.
4. Espere a barra de upload terminar (pode demorar um pouco, são ~30 arquivos)
5. Role a página até o final, em **Commit changes** deixe a mensagem como está (ou escreva "primeira versão do site") e clique no botão verde **Commit changes**

### 1.4 Confirmar que subiu certo
Clique nas pastas `assets` e `tests` dentro do repositório no GitHub — você deve ver os arquivos `.css`, `.js` e os 16 testes `.html` listados. Se as pastas estiverem vazias ou não existirem, alguma coisa não subiu certo no passo 1.3 — me avise que eu te ajudo a resolver.

---

## PARTE 2 — Netlify: publicar o site

### 2.1 Criar a conta
1. Acesse **netlify.com**
2. Clique em **Sign up**
3. Escolha **Sign up with GitHub** (mais fácil — já conecta as duas contas de uma vez) e autorize quando o GitHub pedir

### 2.2 Publicar o site
1. No painel do Netlify, clique em **Add new site** (ou **Add new project**, dependendo da versão da tela)
2. Escolha **Import an existing project**
3. Escolha **Deploy with GitHub**
4. Se pedir autorização de novo, autorize
5. Na lista de repositórios, clique no repositório **mindgauge** que você criou
6. Na tela de configuração que aparece:
   - **Branch to deploy**: deixe `main`
   - **Build command**: deixe em branco (é HTML puro, não precisa de build)
   - **Publish directory**: deixe em branco, ou digite um ponto (`.`)
7. Clique no botão **Deploy site** (ou **Deploy mindgauge**)

### 2.3 Conferir que está no ar
Em 10-30 segundos, o Netlify te dá um link parecido com `https://nome-aleatorio-123.netlify.app`. Clique nele — o site já deve estar funcionando, com os 16 testes ativos. **Guarde esse link** — ele continua funcionando mesmo depois de você conectar o domínio próprio.

---

## PARTE 3 — Conectar o domínio mindgauge.fyi (você comprou na Porkbun)

Primeiro, no Netlify, pra saber o que vamos colar na Porkbun:

1. No painel do Netlify, dentro do seu site, vá em **Domain management** (ou **Domain settings**)
2. Clique em **Add a domain** (ou **Add custom domain**)
3. Digite `mindgauge.fyi` e confirme
4. O Netlify vai detectar que o domínio já existe em outro lugar e vai te dar duas opções — uma pra usar o **Netlify DNS** (Opção A, recomendada) e outra mostrando registros manuais (Opção B). Veja qual delas o Netlify te ofereceu e siga a seção correspondente abaixo.

### Opção A (recomendada) — trocar os nameservers na Porkbun

Essa é a mais simples: a Porkbun continua sendo onde você "aluga" o domínio, mas quem manda no DNS passa a ser o Netlify — ele cuida de tudo, incluindo o certificado de segurança (HTTPS), sem você precisar editar registro nenhum depois.

**No Netlify:**
1. Depois do passo 4 acima, escolha a opção de usar **Netlify DNS** (pode aparecer como "Set up Netlify DNS" ou similar)
2. O Netlify vai te mostrar **4 nameservers**, algo como:
   ```
   dns1.p05.nsone.net
   dns2.p05.nsone.net
   dns3.p05.nsone.net
   dns4.p05.nsone.net
   ```
   (os seus podem ter números diferentes — copie exatamente o que aparecer na sua tela)

**Na Porkbun:**
1. Acesse **porkbun.com** e faça login
2. Você deve cair na tela **Domain Management**. Se não cair, clique em **Account** no canto superior direito → **Domain Management**
3. Encontre `mindgauge.fyi` na lista de domínios
4. Clique no botão **Details** à direita do nome do domínio (ele abre/expande um painel com mais opções)
5. Dentro desse painel, procure o campo **Authoritative Nameservers** (ou só "Nameservers") e clique no ícone de **lápis/editar** ao lado dele
6. Vai abrir uma janela com os nameservers atuais (provavelmente os da própria Porkbun, algo como `curitiba.ns.porkbun.com`)
7. **Apague todos** os que estão listados ali
8. **Cole os 4 nameservers que o Netlify te deu** no passo anterior, um por linha
9. Clique em **Submit** (ou **Save**)

Pronto — do lado da Porkbun terminou. A propagação pode levar de algumas horas até 48h (geralmente é bem mais rápida). Você pode acompanhar em **whatsmydns.net**, digitando `mindgauge.fyi` e escolhendo o tipo **NS**.

> ⚠️ A própria Porkbun avisa: trocar os nameservers desativa qualquer hospedagem de site ou e-mail que esteja configurada por lá nesse domínio. Como você comprou esse domínio só pra esse site novo, isso não deve ser um problema — mas se você criou algum e-mail do tipo `voce@mindgauge.fyi` na Porkbun, me avise antes de continuar, porque precisamos recriar isso depois de outro jeito.

### Opção B (alternativa) — manter os nameservers da Porkbun e adicionar registros manuais

Use isso só se você preferiu não trocar os nameservers (por exemplo, porque já configurou e-mail nesse domínio na Porkbun).

**No Netlify**, anote os valores exatos que ele mostrar na tela (eles podem mudar, sempre confie no que aparece na hora) — geralmente é:
- Um registro **A**, apontando pra um IP (hoje costuma ser `75.2.60.5`)
- Um registro **CNAME** pro `www`, apontando pro link `nome-aleatorio-123.netlify.app` que você guardou na Parte 2.3

**Na Porkbun:**
1. Faça login em **porkbun.com**
2. Na tela de **Domain Management**, encontre `mindgauge.fyi`
3. Clique no botão **DNS** que aparece embaixo do nome do domínio (é mais rápido que ir por "Details")
4. Vai abrir o **Manage DNS Records**, mostrando os registros atuais
5. Se já existir um registro **A** com host `@` (ou em branco) apontando pra outro lugar (página de parking, por exemplo), **delete-o** primeiro
6. Clique em **Add Record**
7. Crie o primeiro registro:
   - **Type**: `A`
   - **Host**: deixe em branco (representa o domínio "puro", `mindgauge.fyi`)
   - **Answer**: `75.2.60.5` (ou o IP que o Netlify mostrou pra você)
   - Clique em salvar/adicionar
8. Clique em **Add Record** de novo, agora pro `www`:
   - **Type**: `CNAME`
   - **Host**: `www`
   - **Answer**: `nome-aleatorio-123.netlify.app` (o link real do seu site, sem `https://` e sem barra no final)
   - Salve

Com isso, tanto `mindgauge.fyi` quanto `www.mindgauge.fyi` devem apontar pro Netlify depois de propagar (de minutos a algumas horas, geralmente bem mais rápido que a troca de nameservers).

### 3.1 Depois de conectar (qualquer uma das opções)
- O Netlify provisiona automaticamente um certificado de segurança grátis (Let's Encrypt) pro `https://mindgauge.fyi` — pode levar de minutos a algumas horas depois do DNS propagar. Acompanhe em **Domain management → HTTPS**, no Netlify.
- Quando o cadeado 🔒 aparecer ao lado de `mindgauge.fyi` no navegador, está tudo certo.

---

## A partir de agora, atualizar o site é automático

Toda vez que eu te der um arquivo novo ou atualizado: você sobe esse arquivo no GitHub (mesma lógica do passo 1.3, dentro do repositório já existente, na pasta certa) → o Netlify detecta a mudança e republica o site sozinho, em segundos, já no domínio mindgauge.fyi. Não precisa repetir nada no Netlify.

```
Eu te dou/atualizo arquivos
        ↓
Você sobe no GitHub (Add file → Upload files)
        ↓
Netlify detecta e republica automaticamente
        ↓
Site atualizado em https://mindgauge.fyi
```

## Checklist rápido pra saber se está tudo certo

- [ ] `https://nome-aleatorio.netlify.app` carrega o site (Parte 2)
- [ ] `https://mindgauge.fyi` também carrega o mesmo site (Parte 3)
- [ ] Aparece o cadeado 🔒 ao lado do endereço (HTTPS ativo)
- [ ] Os 16 testes abrem e funcionam ao clicar nos cards da homepage

Se travar em qualquer passo, me diz exatamente em qual tela você está e o que está vendo — eu te guio a partir daí.
