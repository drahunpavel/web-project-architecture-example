const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

import UserModel from "../models/User";

const jwtSecret = "SecretKey";

const signIn = (req, res) => {
  const { email, password } = req.body;
  //достаю пользователя из БД по его email

  UserModel.findOne({ email })
    .exec()
    .then((user) => {
      //если пользователь не найдет, возвращаю 401 ошибку
      if (!user) res.status(401).json({ message: "User does not exist!" });

      //если пользователь есть, сравниваю захешированные пароли
      const isValid = bcrypt.compareSync(password, user.password);
      //если пароли совпадают, то создаю веб-токен
      //пока теконном будет являться id пользователя в БД
      //в токен же добавляю секретный ключ
      if (isValid) {
        const token = jwt.sign(user._id.toString(), jwtSecret);
        res.json({ token });
      } else {
        res.status(401).json({ message: "Invalid credentials!" });
      }
    })
    .catch((err) => res.status(500).json({ message: err.message }));
};

module.exports = {
  signIn,
};
