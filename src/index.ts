
import express from 'express'
import { ApolloServer } from 'apollo-server'
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'
import resolvers from './resolvers'
import typeDefs from './schema'

async function startServer() {
  const port = process.env.PORT || 9090

  const server = new ApolloServer({ resolvers, typeDefs, context: ({ req }) => ({
      userId: req.headers.authorization || null, 
    }), })

  server.listen({ port }, () =>
    console.log(`Server runs at: http://localhost:${port}`)
  )

  // const app = express()

  // const server = new ApolloServer({
  //   typeDefs,
  //   resolvers,
  //   context: ({ req }) => ({
  //     userId: req.headers.authorization || null, 
  //   }),
  //   plugins: [ApolloServerPluginLandingPageLocalDefault()],
  // })
  // await server.start()
  // server.applyMiddleware({ app })

  // const PORT = process.env.PORT || 9090
  // app.listen(PORT, () => {
  //   console.log(`Server running on port ${PORT}`)
  // })
}

startServer().catch((err) => {
  console.error('Error starting the server:', err)
})