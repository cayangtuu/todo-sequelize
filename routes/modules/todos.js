const express = require('express')
const router = express.Router()
const assert = require('assert')
const Todo = require('../../models/').Todo

router.get('/new', (req, res) => {
  return res.render('new')
})
router.get('/:id', (req, res, next) => {
  const id = req.params.id
  const UserId = req.user.id
  return Todo.findOne({ where: { id, UserId } })
    .then(todo => {
      assert(todo, `該筆資料不存在!`)
      return res.render('detail', { todo: todo.toJSON() })
    })
    .catch(next)
})
router.get('/:id/edit', (req, res, next) => {
  const id = req.params.id
  const UserId = req.user.id
  return Todo.findOne({ where: { id, UserId } })
    .then(todo => {
      assert(todo, `該筆資料不存在!`)
      return res.render('edit', { todo: todo.toJSON() })
    })
    .catch(next)
})
router.post('/', (req, res, next) => {
  const { name } = req.body
  const UserId = req.user.id
  return Todo.create({ name, UserId })
    .then(() => res.redirect('/'))
    .catch(next)
})
router.put('/:id', (req, res, next) => {
  const { name, isDone } = req.body
  const id = req.params.id
  const UserId = req.user.id
  return Todo.findOne({ where: { id, UserId } })
    .then(todo => {
      assert(todo, `該筆資料不存在!`)
      todo.name = name
      todo.isDone = isDone === 'on'
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(next)
})
router.delete('/:id', (req, res, next) => {
  const id = req.params.id
  const UserId = req.user.id
  return Todo.findOne({ where: { id, UserId } })
    .then(todo => {
      assert(todo, `該筆資料不存在!`)
      return todo.destroy()
    })
    .then(() => res.redirect('/'))
    .catch(next)
})

module.exports = router