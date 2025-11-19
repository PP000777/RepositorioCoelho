import express from 'express'
const server = express();


server.use(express.json())


server.get('/', () => {
    return 'Ola mundo!!'
})

server.listen(3000, () => {
    console.log('Ta rodando!: http://localhost:3000/')
})