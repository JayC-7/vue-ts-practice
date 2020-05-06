const menus = require("./mock/menus.json");
const users = require("./mock/users.json");

module.exports = {
  devServer: {
    before(app) {
      const bodyParser = require("body-parser");

      const userConvert = ({ username, roles }) => ({ username, roles });

      app.use(bodyParser.json());

      app.post("/api/getMenus", (req, res) => {
        res.json({
          code: 200,
          success: true,
          ...menus,
        });
      });

      app.post("/api/login", (req, res) => {
        const { username, password } = req.body;
        const hasUser = Object.keys(users).indexOf(username) > -1;

        if (hasUser) {
          if (users[username].password === password) {
            res.json({
              code: 200,
              success: true,
              message: "Login Success!!",
              data: {
                token: new Date().getTime(),
                username: username,
              },
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

      app.get("/api/getUserProfile", (req, res) => {
        try {
          const { authorization } = req.headers;
          const cookies = req.headers.cookie.split(";");
          const username = cookies
            .filter((item) => /^username=/.test(item))[0]
            .replace("username=", "");

          if (authorization) {
            res.json({
              code: 200,
              success: true,
              data: {
                ...userConvert(users[username]),
              },
            });
          } else {
            res.json({
              code: 200,
              success: false,
            });
          }
        } catch (err) {
          console.log("----------------------err", err);
        }
      });
    },
  },
};
