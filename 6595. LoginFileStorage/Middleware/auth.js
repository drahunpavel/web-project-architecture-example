const jwt = require("jsonwebtoken");
const { jwtSecret, tokensConfig } = require("../local").jwtConfig;

//проверка на наличие токена
module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization"); //получаю хеадер авторизации
  if (!authHeader) {
    res.status(401).json({ message: "Token not provider" });
    return;
  }

  //достаю токен и валидирую его
  const token = authHeader.replace("Bearer ", "");
  //try-catch по причине того, что verify бросает ексепшен, если токен не валидный
  try {
    const payload = jwt.verify(token, jwtSecret);
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