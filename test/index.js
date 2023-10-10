const { pool } = require("./db");

async function insertData() {
  const [id, date, zone, sum, client, clientphone, comment] = process.argv.slice(6);
    try {
    const res = await pool.query(
      "INSERT INTO zapisi (id, date, zone, sum, client, clientphone, comment) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [id, date, zone, sum, client, clientphone, comment]
    );
    console.log(`Added a shark with the name ${name}`);
  } catch (error) {
    console.error(error)
  }
}

insertData();