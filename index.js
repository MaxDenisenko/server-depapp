require('dotenv').config()
const express = require('express');
const zapisiRouter = require('./src/routes/zapisi.routes')

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});
app.use('/api', zapisiRouter)

app.listen(PORT, () => {
  console.log(`Server work on port: ${PORT}`);
});
