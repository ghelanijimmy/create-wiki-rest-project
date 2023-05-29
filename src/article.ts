import express from 'express';
import bodyParser from 'body-parser';

import * as mongoose from 'mongoose';

const url = 'mongodb://127.0.0.1:27017/wikiDB';
mongoose.connect(url).then(() => {
  console.log('Connected to MongoDB');
});

import { BodyParamsRequest, BodyRequest, ParamsRequest } from './types/RequestResponse';

type ArticleType = {
  title: string;
  content: string;
};

const articleSchema = new mongoose.Schema<ArticleType>({
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

const router = express.Router();

router.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

/**
 * ALL ARTICLES REQUESTS
 */
router
  .route('/')
  .get((req, res) => {
    Article.find()
      .then((articles) => {
        res.send(articles);
      })
      .catch((err) => {
        res.send(err);
      });
  })
  .post((req: BodyRequest<ArticleType>, res) => {
    const { content, title } = req.body;
    const article = new Article({
      title,
      content,
    });
    article
      .save()
      .then((article) => {
        res.send(article);
      })
      .catch((err) => {
        res.send(err);
      });
  })
  .delete((req: BodyRequest<ArticleType>, res) => {
    Article.deleteMany()
      .then(() => {
        res.send('Successfully deleted all articles');
      })
      .catch((err) => {
        res.send(err);
      });
  });

/**
 * SINGLE ARTICLE REQUESTS
 */
router
  .route('/:id')
  .get((req: ParamsRequest<{ id: string }>, res) => {
    const { id } = req.params;
    Article.findById(id)
      .then((article) => {
        res.send(article);
      })
      .catch((err) => {
        res.send(err);
      });
  })
  .put((req: BodyParamsRequest<{ id: string }, ArticleType>, res) => {
    const { id } = req.params;
    Article.findByIdAndUpdate(id, req.body, { overwrite: true })
      .then((updatedArticle) => {
        res.send(updatedArticle);
      })
      .catch((err) => {
        res.send(err);
      });
  })
  .patch((req: BodyParamsRequest<{ id: string }, ArticleType>, res) => {
    const { id } = req.params;

    Article.findByIdAndUpdate(id, req.body, { overwrite: true })
      .then((updatedArticle) => {
        res.send(updatedArticle);
      })
      .catch((err) => res.send(err));
  })
  .delete((req: ParamsRequest<{ id: string }>, res) => {
    const { id } = req.params;
    console.log(id);
    Article.findByIdAndDelete(id)
      .then(() => {
        res.send('Successfully deleted article');
      })
      .catch((err) => {
        res.send(err);
      });
  });

export default router;
