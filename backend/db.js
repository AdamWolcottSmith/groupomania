const { Pool, Client } = require('pg')

const pool = new Pool({
 user: 'Wolcott',
 password: 'qwerty23',
 host: 'localhost',
 port: 5432,
 database: 'groupnetwork'
})

module.exports = pool;