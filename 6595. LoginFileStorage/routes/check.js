const { Router } = require("express");

const router = Router();

const { logLineAsync, port, logFN } = require("../utils/utils");
const { default: UserController } = require("../Controllers/UserController");
const Auth = require("../Controllers/Auth");

//напрямую к методам класса обратиться нельщя
//поэтому создается экземпляр класса  и после этого можно обратиться к методам
const User = new UserController();

router.get("/", async (req, res, next) => {
  logLineAsync(logFN, `[${port}] ` + `visited Register page`);

  res.render("register", {
    title: "Register page",
    isLogin: true,
  });
});

router.post("/checkForm", async (req, res, next) => {
  const { userName, email, password } = req.body;

  if (!userName.trim() || !email.trim() || !password.trim()) {
    res.render("Information", {
      title: "Information page",
      message: `Repeat the entreted data during authorization. userName: ${userName}, email: ${email}, password: ${password}`,
      isLink: true,
      linkTitle: "Log in",
      link: "/login",
      expiresIn: 60000,
    });
    return;
  }

  let data = await User.create({ userName, email, password });
  if (data) {
    res.send(`добавлен в таблицу пользователь ${data.email}`);
  } else res.status(500).send("Ошибочка");
});

module.exports = router;
