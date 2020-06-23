import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/static/html/index.html`);
});
app.listen(3000, () => {

});
