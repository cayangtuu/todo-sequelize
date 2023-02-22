const express = require('express')
const router = express.Router()
const Todo = require('../../models/').Todo

router.get('/:id', (req, res, next) => {
  const id = req.params.id
  return Todo.findByPk(id)
    .then(todo => res.render('detail', { todo: todo.toJSON() }))
    .catch(err => next(err))
})

module.exports = router