import { fastify } from "fastify"
import { DatabasePostgres } from "./database-postgres.js"

const server = fastify()

const database = new DatabasePostgres()


// Rota para CRIAÇÃO de vídeos
// Request Body
server.post('/videos', async (request, reply) => {
  const { title, description, duration } = request.body

  await database.create({
    title,
    description,
    duration, 
  })

  return reply.status(201).send()
})

// Rota para VISUALIZAÇÃO de vídeos
server.get('/videos', async (request) => {
  const search = request.query.search

  const videos = await database.list(search)

  return videos
})

// Rota para ATUALIZAÇÃO das informações de vídeos
server.put('/videos/:id', async (request, reply) => {
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
server.delete('/videos/:id', async (request, reply) => {
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
}).then(() => {
  console.log('HTTP Server is running!')
})