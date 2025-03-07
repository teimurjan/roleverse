import 'reflect-metadata'

import * as dotenv from 'dotenv'
dotenv.config()

import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import config from '@src/config'
import AuthResolver from '@src/resolvers/auth'
import PostResolver from '@src/resolvers/post'
import UserResolver from '@src/resolvers/user'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import http from 'http'
import path from 'node:path'
import { buildSchema } from 'type-graphql'
import Container from 'typedi'

import setUpContainer from './set-up-container'
import setUpDB from './set-up-db'

const runApp = async () => {
  const db = await setUpDB()

  setUpContainer(db)

  const app = express()
  const httpServer = http.createServer(app)

  const schema = await buildSchema({
    resolvers: [AuthResolver, PostResolver, UserResolver],
    emitSchemaFile: path.resolve(__dirname, '../../schema.graphql'),
    container: Container,
  })

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async requestDidStart(ctx) {
          console.log(
            `QUERY: ${ctx.request.operationName}\r\nPARAMS: ${JSON.stringify(ctx.request.variables)}\r\n`,
          )
        },
      },
    ],
  })
  await server.start()

  app.use(
    '/graphql',
    cookieParser(),
    cors({
      origin: config.cors_origin,
      credentials: true,
    }),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        return { req, res }
      },
    }),
  )

  httpServer.listen({ port: config.port, host: config.host }, () => {
    console.log(`\n🚀 Server ready at http://${config.host}:${config.port}\n`)
  })
}

const listenForExit = () => {
  process.on('unhandledRejection', (e) => {
    console.error(e)
    process.exit(1)
  })
}

listenForExit()
runApp()
