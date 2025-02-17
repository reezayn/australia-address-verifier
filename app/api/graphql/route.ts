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

export async function GET(
  request: Request,
  // context: { params?: Record<string, string> }
): Promise<Response> {
  return handler(request)
}

export async function POST(
  request: Request,
  // context: { params?: Record<string, string> }
): Promise<Response> {
  return handler(request)
}

export const OPTIONS = () =>
  new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
