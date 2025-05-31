<h1 align=center> 🎬 Video Manager API</h1>

<p align=center> Uma API RESTful desenvolvida com Node.js, Fastify e PostgreSQL, permitindo operações CRUD para gerenciamento de vídeos. Projeto próprio criado e desenvolvido para aprendizado e prática de conceitos de back end, como criação de rotas, métodos HTTP, interação com banco de dados, e deploy de aplicações.</p>

## 🚀 Deploy

A aplicação está hospedada no Render:

🔗 [Clique aqui para acessar](https://video-manager-api-dko9.onrender.com)

## 📚 Funcionalidades

- **Criar vídeo**: `POST /videos`
- **Listar vídeos**: `GET /videos`
- **Atualizar vídeo**: `PUT /videos/:id`
- **Deletar vídeo**: `DELETE /videos/:id`
- **Verificar status da API**: `GET /`

## 📦 Tecnologias Utilizadas

- Node.js
- Fastify
- PostgreSQL
- Render (deploy)
- Insomnia e `routes.http` para testes

## 🛠️ Instalação e Uso Local

1. Clone o repositório:

   ```bash
   git clone https://github.com/BernardoSa01/Video-Manager-API.git
   cd Video-Manager-API
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:

   Crie um arquivo `.env` com as seguintes variáveis:

   ```env
   DATABASE_URL=postgresql://usuario:senha@localhost:5432/nome_do_banco
   ```

4. Inicie o servidor:

   ```bash
   npm run dev
   ```

   A API estará disponível em `http://localhost:3333`.

## 🧪 Testando a API

Você pode testar os endpoints utilizando o arquivo `routes.http` no VSCode ou ferramentas como Insomnia/Postman.

Exemplo de requisição para criar um vídeo:

```http
POST https://video-manager-api-dko9.onrender.com/videos
Content-Type: application/json

{
  "title": "Video Node.js",
  "description": "Primeiro vídeo de teste",
  "duration": 180
}
```

## 📁 Estrutura do Projeto

```
Video-Manager-API/
├── database-postgres.js
├── server.js
├── routes.http
├── package.json
└── README.md
```

## 📄 Licença

Este projeto está sob a licença MIT. 

---

Feito com dedicação por [Bernardo Sá](https://www.linkedin.com/in/bernardosa01). Conecte-se comigo!