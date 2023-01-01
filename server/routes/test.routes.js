const TestController = require("../controllers/test.controller");

module.exports = (app) => {
  app.get("/api", TestController.index);
};