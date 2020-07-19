const { Router } = require("express");

const router = Router();

const { logLineAsync, port, logFN } = require("../utils/utils");

router.get("/", (req, res, next) => {
  logLineAsync(logFN, `[${port}] ` + `visited Login page`);

  res.render("login", {
    title: "Login page",
    isLogin: true,
  });
});

module.exports = router;
