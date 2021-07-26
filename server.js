import dotenv from "dotenv"
import express from "express"
import { ApolloServer } from "apollo-server-express"
import mongoose from "mongoose"

dotenv.config()

import typeDefs from "./typeDefs.js"
import resolvers from "./resolvers.js"

async function start() {
  const app = express()
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  })

  await apolloServer.start()
  apolloServer.applyMiddleware({ app })

  app.use((req, res) => {
    res.send("Hello from Apollo server express")
  })

  const {DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME} = process.env

  console.log("env", {
    DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME
  }, `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`)

  try {
    await mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })

    console.log(`mongodb connected to ${process.env.DB_HOST}:${process.env.DB_PORT}`)
  } catch (error) {
    console.log("error connecting to mongo", error)
  }

  app.listen(4000, () => console.log("Server is running on port 4000"))
}

start()
