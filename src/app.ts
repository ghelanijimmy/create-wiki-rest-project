import express from 'express';
import bodyParser from 'body-parser';
import ejs from 'ejs';
import mongoose from 'mongoose';

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use(express.static('public'));

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
