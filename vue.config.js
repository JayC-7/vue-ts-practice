const menus = require("./mock/menus.json");
const users = require("./mock/users.json");

module.exports = {
  devServer: {
    before(app) {
      const bodyParser = require("body-parser");

      app.use(bodyParser.json());

      app.post("/api/getMenus", (req, res) => {
        res.json({
            code: 200,
            success: true,
            ...menus
        });
      });

      app.post("/api/login", (req, res) => {
        const { username, password } = req.body;
        const hasUser = Object.keys(users).indexOf(username) > -1;

        if (hasUser) {
          if (users[username] === password) {
            res.json({
              code: 200,
              success: true,
              message: "Login Success!!",
              token: new Date().getTime(),
            });
          } else {
            res.json({
              code: 200,
              success: false,
              message: "用户名密码不匹配",
            });
          }
        } else {
          res.json({
            code: 200,
            success: false,
            message: "用户不存在",
          });
        }
      });
    },
  },
};
