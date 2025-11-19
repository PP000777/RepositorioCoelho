import express, { response } from 'express'
import pg from 'pg'

const { Pool } = pg

const server = express();
server.use(express.json())

const sql = new Pool({
    host: 'localhost',
    user: 'local',
    password: '12345',
    database: 'teste',
    port: 5432
})

const list = []

server.get('/users', async (req, res) => {
    try {
        const resultado = await sql.query('SELECT * FROM users')

        return res.json({ resuts: response.rows, ok: true })
    } catch (error) {
        res.status(500).json({ message: error, ok: false })
    }


})

server.post('/users', async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const profile = req.body.profile;
    try {
        const response = await sql.query('INSERT INTO users (name, email, password, profile) VALUES ($1, $2, $3, $4)', [name, email, password, profile])
        return res.send('usuario cadastrado com sucesso!!')
    }
    catch (error) {
        res.status(500).json({ message: error, ok: false })

    }})

server.listen(3000, () => {
    console.log('Ta rodando!: http://localhost:3000/')
})