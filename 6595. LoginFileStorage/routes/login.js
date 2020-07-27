const { Router } = require("express");

const router = Router();

const { logLineAsync, port, logFN } = require("../utils/utils");
const { default: UserController } = require("../Controllers/UserController");
const Auth = require("../Controllers/Auth");

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

  if (!email.trim() || !password.trim()) {
    res.render("Information", {
      title: "Information page",
      message: `Repeat the entreted data during authorization. email: ${email}, password: ${password}`,
      isLink: true,
      linkTitle: "Log in",
      link: "/login",
    });
    return;
  }
  Auth.signIn({ email, password }, res);
  // let resultAuth = await Auth.signIn({ email, password }, res);
  // console.log("--resultAuth", resultAuth);
  // if (resultAuth.message === "User does not exist") {
  //   res.render("Information", {
  //     title: "Information page",
  //     // message: resultAuth.message,
  //     message: "User is not found. Please register",
  //     isLink: true,
  //     linkTitle: "Check in",
  //     link: "/check",
  //   });
  //   return;
  // }
  // if (resultAuth.tokens) {
  //   console.log("--resultAuth.tokens", resultAuth.tokens);
  //   res.send("heo;o");
  // }
  // let data = await User.create({ userName, email, password });
  // if (data) {
  //   res.send(`добавлен в таблицу пользователь ${data.email}`);
  // } else res.status(500).send("Ошибочка");
});

module.exports = router;
