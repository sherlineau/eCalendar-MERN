const UserController = require("../controllers/user.controller")
const { authenticate } = require('../config/jwt.config')

module.exports = app => {
  app.post(`/api/user/register`, UserController.register)
  app.post(`/api/user/login`, UserController.login)
  app.get(`/api/users`, UserController.getAll)
  app.get(`/api/user/logout`, UserController.logout)
  app.get(`/api/user/:_id`, UserController.getOne)
  app.put(`/api/user/update/:_id`,UserController.updateUser)
  app.delete(`/api/user/:_id`, UserController.updateUser)
}