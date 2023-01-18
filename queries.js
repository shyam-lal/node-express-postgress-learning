const pool = require('./postgres-config');

const getUsers = (req, res) => {
    pool.pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows);
    })
}

module.exports = {
    getUsers
}