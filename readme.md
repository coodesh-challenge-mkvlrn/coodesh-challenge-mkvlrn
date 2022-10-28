# coodesh-challenge-mkvlrn

referente ao repo <https://lab.coodesh.com/mkvlrn/nodejs-20201030>

---

## tldr; requisitos

- docker, docker compose
- portas livres:
  - 3000
  - 3001
  - 4000
  - 4001
- ambiente linux, de preferência (não testei no windows)
- node lts (18.12.0 aqui)
- yarn

---

## rodando

**ambiente "prod", tudo em containers:**

```bash
# pra baixar a imagem que tá no hub e pegar a do mysql se não tiver, melhor que buildar localmente imo
docker compose pull

# build local, se não for baixar a imagem no hub
docker compose build

# rodando
docker compose up -d
```

frontend em <http://localhost:3000>, backend em <http://localhost:4000>

**ambiente dev, somete com db no container:**

```bash
# deps
yarn install

# db no container
docker compose up -d dev-db

# backend
yarn backend:dev

# frontend
yarn frontend:dev
```

frontend em <http://localhost:3001>, backend em <http://localhost:4001>

---

## o que foi feito

**tecnologias, libs, etc:**

- projeto
  - monorepo com yarn workspaces
  - typescript!
  - eslint com config baseada na do airbnb
  - prettier pra deixar o código 💄 **B O N I T O** 💄
  - unit tests com jest
  - commitlint pras mensagens de commit
  - husky e lint-staged pra tudo rodar no commit e não deixar 💩 entrar na codebase
- backend
  - rest com express
  - inspirado em, mas não 100% clean arch, usando DI (tsyringe)
  - prisma orm
  - documentação openapi gerada a partir de código/comments com swaggerJsdoc
- frontend
  - react, sem framework ou generator - webpack configurado manualmente
  - mantine como UI
  - react-query pra integrar com o backend

**aderência ao challenge:**

- [x] REST com node com melhores práticas - acho que sim!
- [ ] MongoDb - o problema não é o NoSQL, mas como ele não se dá bem com o prisma, então decidi usar MySQL, já que era uma opção notada nas instruções
- [x] integração API/DB
- [x] testes unitários
- [x] CRON, configurado pra 09:00h todo dia
- [x] CRUD, endpoints solicitados
- [x] frontend com react, listando e podendo editar/apagar produtos (editar nome, pra poupar tempo)
- [x] docker configurado
- [x] alerta em falha de sync no frontend
- [x] documentação openapi
- [x] unit tests (já tava ali em cima, mas aparece duas vezes nas instruções?)
