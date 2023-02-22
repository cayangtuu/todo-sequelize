const express = require('express')
const router = express.Router()
const Todo = require('../../models/').Todo

router.get('/', (req, res, next) => {
  const UserId = req.user.id
  return Todo.findAll({
    where: { UserId },
    raw: true,
    order: [['id', 'ASC']]
  })
    .then(todos => {
      return res.render('index', { todos })
    })
    .catch(next)
})

module.exports = router