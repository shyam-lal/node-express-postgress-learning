const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'nodeLearning',
    password: 'qwerty',
    port: '5432'
})