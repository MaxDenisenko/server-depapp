const { request } = require('express');

const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'depapp',
  host: 'localhost',
  database: 'depapp',
  password: 'PtktyjdfUfkbyf',
  port: 5432,
});

const getZapisi = () => {
  return new Promise(function (res, rej) {
    pool.query('SELECT * FROM zapisi', (error, results) => {
      if (error) {
        rej(error);
      }
      res(results.rows);
    });
  });
};

const createZapisi = (body) => {
  return new Promise(function (res, rej) {
    const { id, date, zone, sum, client, clientphone, comment } = body;
    pool.query('INSERT INTO zapisi (id, date, zone, sum, client, clientphone,comment) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [id, date, zone, sum, client, clientphone, comment], (error, results) => {
      if (error) {
        rej(error);
      }
      res(`A new zapis has been added added: ${results}`);
    });
  });
};

const deleteZapisi = (id) => {
  return new Promise(function (resolve, reject) {
    pool.query('DELETE FROM zapisi WHERE id = $1', [id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(`Zapis deleted with ID: ${id}`);
    });
  });
};

module.exports = {
  getZapisi,
  createZapisi,
  deleteZapisi,
};
