const req = require('express/lib/request');
const res = require('express/lib/response');
const pool = require('./postgres-config');

const getUsers = (req, res) => {
    pool.pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows);
    })
}

const getUserById = (req, res) => {
    const id = parseInt(req.params.id)
    pool.pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const createUser = (req, res) => {
    const { name, email } = req.body
    pool.pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email], (error, results) => {
        if (error) {
            throw error
        }
        res.status(201).send(`User added with id: ${results.rows[0].id}`)
    })
}

const updateUser = (req, res) => {
    const id = parseInt(req.params.id)
    const { name, email } = req.body
    
    pool.pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', 
    [name, email, id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).send(`User modified with id: ${id}`)
    })
}

const deleteUser = (req, res) => {
    const id = parseInt(req.params.id)

    pool.pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw(error)
        }
        res.status(200).send(`User deleted with id: ${id}`)
    })
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}