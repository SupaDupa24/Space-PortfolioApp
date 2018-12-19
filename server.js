import express from 'express'
import http from 'http';
import graphqlHTTP from 'express-graphql'
import cors from 'cors'
import {schema} from './schema'
import dotenv from 'dotenv'

dotenv.config();

const app = express()
const { PORT = 4000 } = process.env

app.server = http.createServer(app);

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: `${process.env.GRAPHIQL}` || true
}))

app.server.listen(PORT, () => console.log(`Server started on port ${app.server.address().port}`))