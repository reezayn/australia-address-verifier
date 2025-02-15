import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { schema } from '@/lib/schema'

const server = new ApolloServer({
  schema,
})

export const config = {
  api: {
    bodyParser: false,
  },
}

const handler = startServerAndCreateNextHandler(server)

export const GET = handler
export const POST = handler
