// Criando o banco de dados postgres
import { randomUUID } from "node:crypto"
import { sql } from './db.js'
import { title } from "node:process"

export class DatabasePostgres {
  async list(search) {
    let videos

    if(search) {
      videos = await sql`select * from videos where title ilike ${'%' + search + '%'}`
    } else {
      videos = await sql`select * from videos`
    }

    return videos
  }

  async findById(id) {
    const video = await sql`select * from videos where id = ${id}`

    // Retorna undefined caso não exista
    return video[0]           
  }

  async create(video) {
   const videoId = randomUUID() 
   const { title, description, duration } = video

   await sql`insert into videos (id, title, description, duration) VALUES (${videoId}, ${title}, ${description}, ${duration})`
  }

  async update(id, video) {
    const { title, description, duration } = video

    await sql `update videos set title = ${title}, description = ${description}, duration = ${duration} WHERE id = ${id}`
  }

  async delete(id) {
    await sql `delete from videos where id = ${id}`
  }
}