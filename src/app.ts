import express from 'express';
import articleRouter from './article';

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/articles', articleRouter);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
