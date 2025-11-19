import express from 'express'
import cors from 'cors'
import pg from 'pg'

const { Pool } = pg

const server = express()
server.use(express.json())
server.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}))

const sql = new Pool({
    host: 'localhost',
    user: 'local', 
    password: '12345',
    database: 'teste',
    port: 5432
})

server.get('/users', async (req, res) => {
    try {
        const resultado = await sql.query('SELECT * FROM users')
        return res.json({ results: resultado.rows, ok: true })
    } catch (error) {
        res.status(500).json({ message: error, ok: false })
    }
})

server.post('/users', async (req, res) => {
    const { name, email, password, profile } = req.body

    try {
        await sql.query(
            'INSERT INTO users (name, email, password, profile) VALUES ($1, $2, $3, $4)',
            [name, email, password, profile]
        )
        return res.send('Usuário cadastrado com sucesso!!')
    }
    catch (error) {
        res.status(500).json({ message: error, ok: false })
    }
})

server.post('/login', async (req, res) => {
    const { email, password } = req.body

    try {
        const resposta = await sql.query(
            'SELECT * FROM users WHERE email = $1 AND password = $2',
            [email, password]
        )

        if (resposta.rows.length > 0) {
            return res.json({ message: 'Login bem sucedido!', ok: true })
        } else {
            return res.status(401).json({ message: 'Credenciais inválidas', ok: false })
        }
    }
    catch (error) {
        res.status(500).json({ message: error, ok: false })
    }
})

server.listen(3000, () => {
    console.log('Rodando: http://localhost:3000/')
})
