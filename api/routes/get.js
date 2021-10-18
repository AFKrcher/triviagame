const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../knexfile.js')[process.env.NODE_ENV || 'development']);

router.get('/', (req, res) => {
  knex.select('*')
  .from('files')
  .then(data => res.status(200).json(data))
  .catch(err => res.status(404).json(`An error has occured: ${err}`))
})

router.get('/quiz/:title', (req, res) => {
  knex.select('*')
  .from('files')
  .where('title', `${req.params.title}`)
  .then(data => res.status(200).json(data))
  .catch(err => res.status(404).json(`An error has occured: ${err}`))
})

router.get('/titles', (req, res) => {
  knex.select('title')
  .from('files')
  .distinctOn('title')
  .then(data => res.status(200).json(data))
  .catch(err => res.status(404).json(`An error has occured: ${err}`))

})

module.exports = router;