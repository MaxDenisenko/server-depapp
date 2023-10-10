const express = require('express');
const app = express();
const port = 3001;

const zapisi = require('./zapisi');

app.use(express.json());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

app.get('/depapp/users', (req, res) => {
res.send('users')
}
);
app.get('/depapp/', (req, res) => {
  zapisi
    .getZapisi()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});


app.post('/depapp/zapisi', (req, res) => {  
zapisi
    .createZapisi(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.send(error);
    });
});

app.delete('/depapp/zapisi/:id', (req, res) => {
  console.log(req.params.id);
  zapisi
    .deleteZapisi(req.params.id)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.listen(port, () => {
  console.log(`Server work on port: ${port}`);
});
