import express from "express"
import { ApolloServer } from "apollo-server-express"
import mongoose from "mongoose"
const LOCAL_DB = "mongodb://localhost:27017/vps_svelte_db"

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

  const { DB_CONNECTION_STRING } = process.env

  try {
    await mongoose.connect(DB_CONNECTION_STRING || LOCAL_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })

    console.log("mongodb connected!")
  } catch (error) {
    console.log("error connecting to mongo", error)
  }

  app.listen({port: process.env.PORT || 4000}, () => console.log("Server is running on port 4000"))
}

start()
