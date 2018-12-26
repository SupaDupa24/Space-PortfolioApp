import express from 'express'
import http from 'http';
import graphqlHTTP from 'express-graphql'
import cors from 'cors'
import {schema} from './schema'
import dotenv from 'dotenv'
import path from 'path'

// Reconocer archivos .env
dotenv.config();

const app = express()
const { PORT = 4000 } = process.env

// Habilita cors
app.use(cors())

// Crea servidor HTTP
app.server = http.createServer(app);

// Configura GraphQl ennpoint
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: `${process.env.GRAPHIQL}` || true
}))

app.use(express.static('public'))
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/build', 'index.html'))
})

//Levanta servidor en puerto de configuracion o 4000 por defecto
app.server.listen(PORT, () => console.log(`Servidor API levantado en el puerto ${app.server.address().port}`))