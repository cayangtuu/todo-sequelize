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
  if (!name || !email || !password || !confirmPassword) throw new Error(`所有欄位皆須填寫!`)
  if (password !== confirmPassword) throw new Error(`密碼不相符!`)
  return User.findOne({ where: { email } })
    .then(user => {
      if (user) throw new Error('帳號已註冊過了!')
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({
          name,
          email,
          password: hash
        }))
        .then(() => res.redirect('/'))
        .catch(next)
    })
    .catch(next)
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '登出成功!')
  return res.redirect('/users/login')
})

module.exports = router