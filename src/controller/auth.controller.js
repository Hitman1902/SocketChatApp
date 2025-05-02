const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const cookie = require('cookie-parser')
const { success, error } = require('../helpers/responsibleHelper')
const { generateToken } = require('../helpers/generateToken')
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body

    const existingUser = await User.findOne({ where: { email } })
    if (existingUser) return error(res, 'Email already registered', 400)

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    })
    const token = generateToken(user.id, user.name)
    res.setCookie('token', token)
    success(res, 'User registered', {
      id: user.id,
      name: user.name,
      email: user.email,
      token,
    })
  } catch (err) {
    console.error('Register Error:', err)
    error(res, 'Registration failed')
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ where: { email } })
    if (!user) return error(res, 'Invalid credentials', 401)

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return error(res, 'Invalid credentials', 401)

    const token = generateToken(user.id, user.name)

    success(res, 'Login successful', { token })
  } catch (err) {
    console.error('Login Error:', err)
    error(res, 'Login failed')
  }
}

const logout = async (req, res) => {
  try {
    res.clearCookie('token')
    success(res, 'logout successful')
  } catch (err) {
    console.error('Logout Error:', err)
    error(res, 'Logout failed')
  }
}
module.exports = { register, login, logout }
