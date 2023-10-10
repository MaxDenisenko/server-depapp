const { Pool} = require('pg');

const pool = new Pool({
  user: 'depapp',
  database: 'depapp',
  password: 'PtktyjdfUfkbyf',
  port: 5432,
  host: 'localhost',
});
module.exports = { pool };