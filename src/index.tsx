import { Hono } from 'hono'
import { renderer } from './renderer'
import { drizzle } from 'drizzle-orm/d1'
import { sql, eq } from 'drizzle-orm'
import { episodes, shownotes } from './schema'

type Bindings = {
  DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

app.get('*', renderer)

app.get('/', async (c) => {
  const db = drizzle(c.env.DB)
  const result = await db.select(
    {
      e_id: sql<number>`${episodes.id}`.as('e_id'),
      e_title: sql<string>`${episodes.title}`.as('e_title'),
      e_link: sql<string>`${episodes.link}`.as('e_link'),
      e_pubDate: episodes.pubDate,
      s_id: sql<number>`${shownotes.id}`.as('s_id'),
      s_title: sql<string>`${shownotes.title}`.as('s_title'),
      s_link: sql<string>`${shownotes.link}`.as('s_link'),
    }
  ).from(episodes).innerJoin(shownotes, eq(episodes.id, shownotes.episodeId)).where(eq(episodes.id, 10)).all();
  console.log(result)
  return c.render(<h1>Hello!</h1>)
})

export default app
