import { fastify } from "fastify"
import swagger from '@fastify/swagger'
import swaggerUI from '@fastify/swagger-ui'
import { DatabasePostgres } from "./database-postgres.js"

async function bootstrap() {
const server = fastify()
const database = new DatabasePostgres()

// Swagger 
await server.register(swagger, {
  openapi: {
    openapi: '3.0.0', 
    info: {
      title: 'Video Manager API',
      description: 'API para gerenciamento de videos com Fastify e PostgreSQL',
      version: '1.0.0',
    },
  },
})

await server.register(swaggerUI, {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'full',
  },
})

server.post('/videos', {
  schema: {
    summary: 'Cria um novo vídeo',
    tags: ['Videos'],
    body: {
      type: 'object',
      required: ['title', 'description', 'duration'],
      properties: {
        title: { type: 'string' },
        description: { type: 'string' },
        duration: { type: 'integer' }
      }
    },
    response: {
      201: {
        description: 'Vídeo criado com sucesso',
        type: 'object',
        properties: {
          message: { type: 'string' }
        }
      },
      400: {
        description: 'Requisição inválida',
        type: 'object',
        properties: {
          error: { type: 'string' }
        }
      }
    }
  }
}, async (request, reply) => {
  const { title, description, duration } = request.body

  await database.create({ title, description, duration })

  return reply.status(201).send()
})


// Rota para VISUALIZAÇÃO de vídeos
server.get('/videos', {
  schema: {
    summary: 'Visualiza os videos registrados na base de dados',
    tags: ['Videos'],
    querystring: {
      type: 'object',
      properties: {
        search: {
          type: 'string',
          description: 'Texto para buscar por título ou descrição'
        }
      }
    },
    response: {
      200: {
        description: 'Lista de vídeos',
        type: 'array', // Retorna uma lista
        items: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'abc123'},
            title: { type: 'string', example: 'Aprendendo Swagger'},
            description: { type: 'string', example: 'Curso completo'},
            duration: { type: 'integer', example: 120}
          }
        }
      }
    }
  }
}, async (request) => {
  const search = request.query.search

  const videos = await database.list(search)

  return videos
})

// Rota para VISUALIZAR um video específico por ID
server.get('/videos/:id', {
  schema: {
    summary: 'Busca um vídeo específico por ID',
    tags: ['Videos'],
    params: {
      type: 'object',
      properties: {
        id: { type: 'string'}
      },
      required: ['id']
    },
    response: {
      200: {
        description: 'Vídeo encontrado',
        type: 'object',
        properties: {
          id: { type: 'string' },
          title: { type: 'string' },
          description: { type: 'string'},
          duration: { type: 'integer' }
        }
      },
      404: {
        description: 'Vídeo não encontrado',
        type: 'object',
        properties: {
          message: { type: 'string' }
        }
      }
    }
  }
}, async (request, reply) => {
  const videoId = request.params.id

  const video = await database.findById(videoId)

  if (!video) {
    return reply.status(404).send({ message: 'Video não encontrado'})
  }

  return video
})

// Rota para ATUALIZAÇÃO das informações de vídeos
server.put('/videos/:id', {
  schema: {
    summary: 'Atualiza as informações de um vídeo específico, selecionado por ID',
    tags: ['Videos'],
    params: {
      type: 'object',
      properties: {
        id: { type: 'string'}
      }, 
      required: ['id']
    },
    body: {
      type: 'object',
      required: ['title', 'description', 'duration'],
      properties: {
        title: { type: 'string' },
        description: { type: 'string' },
        duration: { type: 'integer' }
      }
    },
    response: {
      204: {
        description: 'Vídeo atualizado com sucesso'
      },
      404: {
        description: 'Vídeo não encontrado',
        type: 'object',
        properties: {
          message: { type: 'string' }
        }
      }
    }
  }
}, async (request, reply) => {
  const videoId = request.params.id
  const { title, description, duration } = request.body
  
  await database.update(videoId, {
    title,
    description, 
    duration
  })

  return reply.status(204).send()
})

// Rota para DELEÇÃO de vídeos
server.delete('/videos/:id', {
  schema: {
    summary: 'Deleta um vídeo baseado em pesquisa por ID',
    tags: ['Videos'],
    params: {
      type: 'object',
      properties: {
        id: { type: 'string' }
      },
      required: ['id']
    },
    response: {
      204: {
        description: 'Vídeo deletado com sucesso'
      },
      404: {
        description: 'Vídeo não encontrado',
        type: 'object',
        properties: {
          message: { type: 'string' }
        }
      }
    }
  }
}, async (request, reply) => {
  const videoId = request.params.id 

  await database.delete(videoId)

  return reply.status(204).send()
})

// Rota raiz para verificação rápida do status da API
server.get('/', async () => {
  return { message: 'Video Manager API is running!' }
})


server.listen({
  port: process.env.PORT ?? 3333,
  host: '0.0.0.0'
})

console.log('HTTP Server is running!')
}

bootstrap()


/*server.post('/videos', async (request, reply) => {
  const { title, description, duration } = request.body

  await database.create({
    title,
    description,
    duration, 
  })

  return reply.status(201).send()
})*/