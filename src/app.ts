import express from 'express';
import bodyParser from 'body-parser';
import * as mongoose from 'mongoose';

const app = express();
app.set('view engine', 'ejs');
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use(express.static('public'));

const url = 'mongodb://127.0.0.1:27017/wikiDB';

mongoose.connect(url).then(() => {
  console.log('Connected to MongoDB');
});

const articleSchema = new mongoose.Schema<{
  title: string;
  content: string;
}>({
  title: {
    type: String,
    required: [true, 'Please check your data entry, no name specified!'],
  },
  content: {
    type: String,
    required: [true, 'Please check your data entry, no name specified!'],
  },
});

const Article = mongoose.model('Article', articleSchema);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/articles', (req, res) => {
  Article.find()
    .then((articles) => {
      res.send(articles);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
