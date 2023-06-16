import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import typeDefs from "./schema/schemaGQL.js";
import mongoose from "mongoose";
import { MONGO_URI } from "./config.js";

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on("connected", () => {
    console.log("connected to mongodb")
})

mongoose.connection.on("error", (err) => {
    console.log("error while connecting", err)
})

import './models/Users.js'
import './models/Quotes.js'
import resolvers from "./resolvers/resolvers.js"

const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground()
    ]
})

server.listen().then(({ url }) => {
    console.log(`Server running at ${url}`)
})