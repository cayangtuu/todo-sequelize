const express = require('express')
const router = express.Router()
const User = require('../../models/').User
const passport = require('passport')
const bcrypt = require('bcryptjs')

router.get('/login', (req, res) => {
  return res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/register', (req, res) => {
  return res.render('register')
})

router.post('/register', (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body
  return User.findOne({ where: { email } })
    .then(user => {
      if (user) throw new Error('User already exists')
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({
          name,
          email,
          password: hash
        }))
        .then(() => res.redirect('/'))
        .catch(err => next(err))
    })
    .catch(err => next(err))
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success', 'successfully logout!')
  return res.redirect('/users/login')
})

module.exports = router