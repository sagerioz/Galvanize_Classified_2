
'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../db/knex')

// YOUR CODE HERE

function notFound(res) {
  res.setHeader("Content-Type", "text/plain");
  res.status(404);
  res.send('Not Found');
}

router.get('/', (req, res, next) => {
  knex('classifieds')
    .select(['id', 'title', 'description', 'price', 'item_image'])
    .then((ads) => {
      res.setHeader('Content-Type', 'application/json')
      res.status(200);
      res.send(ads);
    })
})

router.get('/:id', (req, res, next) => {
  let id = req.params.id;

  knex('classifieds')
    .where('id', id)
    .select(['id', 'title', 'description', 'price', 'item_image'])
    .then((ad) => {
      res.setHeader('Content-Type', 'application/json')
      res.status(200);
      res.send(ad[0]);
    })
})

router.post('/', (req, res, next) => {

  knex('classifieds')
    .insert({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      item_image: req.body.item_image
    }, ['id','title', 'description', 'price', 'item_image'])
    .then((newPost) => {
      res.setHeader('Content-Type', 'application/json')
      res.status(200);
      res.send(newPost[0]);
    })
})

router.patch('/:id', (req, res, next) => {
  let id = req.params.id;

  knex('classifieds')
    .where('id', id)
    .then((ad) => {
      if (ad.length === 0) {
        notFound(res);
      }
      else {
        knex('classifieds')
          .returning(['id','title', 'description', 'price', 'item_image'])
          .where('id', id)
          .update({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            item_image: req.body.item_image
          })
          .then(ad => {
            res.setHeader('Content-Type', 'application/json')
            res.status(200);
            res.send(ad[0]);
          })
      }
    })
})

router.delete('/:id', (req, res, next) => {
  let id = req.params.id;

  if (isNaN(parseInt(id))) {
    notFound(res);
    return;
  }

  knex('classifieds')
    .returning(['id','title', 'description', 'price', 'item_image'])
    .where('id', id)
    .del()
    .then(ad => {
      if (ad.length === 0) {
        notFound(res);
      }
      else {
        res.setHeader('Content-Type', 'application/json')
        res.status(200);
        res.send(ad[0]);
      }
    })
})
module.exports = router;
