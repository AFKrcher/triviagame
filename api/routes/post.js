const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../knexfile.js')[process.env.NODE_ENV || 'development']);

router.post('/', (req, res) => {
  knex('files')
  .insert(req.body)
  .then(data => res.status(201).json('File Uploaded'))
  .catch(err => res.status(404).json(`Nothing POSTed: ${err}`))
})

module.exports = router;