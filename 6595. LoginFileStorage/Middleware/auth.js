const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../local").jwtConfig;

//проверка на наличие токена
module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization"); //получаю хеадер авторизации
  if (!authHeader) {
    // res.status(401);
    // res.redirect("/login");
    res.render("Information", {
      title: "Information page",
      message: "You are not authorized",
      isLink: true,
      linkTitle: "Log in",
      link: "/login",
    });
    return;
  }

  //достаю токен и валидирую его
  const token = authHeader.replace("Bearer ", "");
  //try-catch по причине того, что verify бросает ексепшен, если токен не валидный
  try {
    const payload = jwt.verify(token, jwtSecret);
    //проверка на то, что истекло время жизни токена
    if (payload.type !== "access") {
      res.status(401).json({ message: "Invalid token" });
      return;
    }
  } catch (e) {
    if (e instanceof jwt.TokenExpiredError) {
      res.status(401).json({ message: "Token expired" });
      return;
    }
    if (e instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }
  }

  next();
};
