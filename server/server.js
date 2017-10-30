const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

const routes = require('./routes');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', routes);

app.use((req, res) => {
  res.status(404).json({
    message: '404: not found'
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Listening on port', process.env.PORT || 3000);
});
