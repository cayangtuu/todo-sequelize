const express = require('express')
const router = express.Router()
const Todo = require('../../models/').Todo

router.get('/', (req, res, next) => {
  return Todo.findAll({
    raw: true,
  })
    .then(todos => { return res.render('index', { todos }) })
    .catch(err => next(err))
})

module.exports = router