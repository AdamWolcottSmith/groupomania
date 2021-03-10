const Pool = require('pg').Pool

const pool = new Pool({
 user: 'Wolcott',
 password: 'qwerty23',
 host: 'localhost',
 port: 5432,
 database: 'groupnetwork'
})

module.exports = {
 query: (text, params, callback) => {
  return pool.query(text, params, callback)
 },
}

// module.exports = pool;