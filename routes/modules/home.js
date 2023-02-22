const express = require('express')
const router = express.Router()
const assert = require('assert')
const Todo = require('../../models/').Todo

router.get('/', (req, res, next) => {
  const UserId = req.user.id
  return Todo.findAll({
    where: { UserId },
    raw: true,
    order: [['id', 'ASC']]
  })
    .then(todos => {
      assert(todos.length, '所有資料不存在!')
      return res.render('index', { todos })
    })
    .catch(next)
})

module.exports = router