const express = require('express')
const router = express.Router()
const Todo = require('../../models/').Todo

router.get('/', (req, res) => {
  return Todo.findAll({
    raw: true,
  })
    .then(todos => { return res.render('index', { todos }) })
    .catch(err => res.status(422).json(err))
})

module.exports = router