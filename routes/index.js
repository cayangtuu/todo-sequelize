const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const users = require('./modules/users')
const todos = require('./modules/todos')
const { generalErrorHandler } = require('../middleware/error')
const { authenticator } = require('../middleware/auth')

router.use('/users', users)
router.use('/todos', authenticator, todos)
router.use('/', authenticator, home)
router.use('/', generalErrorHandler)

module.exports = router