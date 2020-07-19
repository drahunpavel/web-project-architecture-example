const jwt = require("jsonwebtoken");
const jwtSecret = "SecretKey";

//проверка на наличие токена
module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization"); //получаю хеадер авторизации
  if (!authHeader) {
    res.status(401).json({ message: "Token not provider" });
  }

  //достаю токен и валидирую его
  const token = authHeader.replace("Bearer ", "");
  //try-catch по причине того, что verify бросает ексепшен, если токен не валидный
  try {
    jwt.verify(token, jwtSecret);
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ message: "Invalid token" });
    }
  }

  next();
};
