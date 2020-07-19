const { Router } = require("express");

const router = Router();

const { logLineAsync, port, logFN } = require("../utils/utils");
const { default: UserController } = require("../Controllers/UserController");

//напрямую к методам класса обратиться нельщя
//поэтому создается экземпляр класса  и после этого можно обратиться к методам
const User = new UserController();

router.get("/", async (req, res, next) => {
  logLineAsync(logFN, `[${port}] ` + `visited Login page`);

  res.render("login", {
    title: "Login page",
    isLogin: true,
  });
});

router.post("/loginForm", async (req, res, next) => {
  const { userName, email, password } = req.body;

  let data = await User.create({ userName, email, password });
  if (data) res.send(`добавлен в таблицу пользователь ${data.email}`);
  else res.status(500).send("Ошибочка");
});

module.exports = router;
