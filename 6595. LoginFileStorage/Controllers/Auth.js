const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

import UserModel from "../models/User";
import TokenModel from "../models/token";

const { jwtSecret } = require("../local").jwtConfig;
const authHelper = require("../Auth/authHelper");

const uptadeTokens = (userId) => {
  const accessToken = authHelper.generateAccessToken(userId);
  const refreshToken = authHelper.generateRefreshToken();
  return authHelper.replaceDbRefreshToken(refreshToken.id, userId).then(() => ({
    accessToken,
    refreshToken: refreshToken.token,
  }));
};

const signIn = async (req, res) => {
  // const { email, password } = req.body;
  let { email, password } = req;

  //достаю пользователя из БД по его email
  await UserModel.findOne({ email })
    .exec()
    .then((user) => {
      //если пользователь не найдет, возвращаю 401 ошибку
      if (!user) {
        return res.render("Information", {
          title: "Information page",
          message: "User is not found. Please register",
          isLink: true,
          linkTitle: "Check in",
          link: "/check",
        });
        // res.status(401).json({ message: "User does not exist!" });
        // return { status: 401, message: "User does not exist" };
      }

      //если пользователь есть, сравниваю захешированные пароли
      const isValid = bcrypt.compareSync(password, user.password);
      //если пароли совпадают, то создаю веб-токен
      //в токен же добавляю секретный ключ
      if (isValid) {
        uptadeTokens(user._id).then((tokens) => {
          // res.json({ data: { tokens, user: user.userName } });
          // res.send({ data: tokens });
          // return res.redirect("/file/addFile");
          return res.render("Information", {
            title: "Information page",
            message: `Welcome ${user.userName}`,
            isLink: true,
            linkTitle: "Home page",
            link: "/",
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            user: user.userName,
            expiresIn: 60000,
            userName: user.userName,
          });
        });
      } else {
        res.status(401).json({ message: "Invalid credentials!" });
      }
    })
    .catch((err) => res.status(500).json({ message: err.message }));
};

const refreshTokens = (req, res) => {
  const { refreshToken } = req.body;
  let payload;
  try {
    payload = jwt.verify(refreshToken, jwtSecret);
    if (payload.type !== "refresh") {
      // res.status(400).json({ message: "Invalid token" });
      res.render("Information", {
        title: "Information page",
        message: "You are not authorized",
        isLink: true,
        linkTitle: "Log in",
        link: "/login",
        //expiresIn: 60000,
      });
      return;
    }
  } catch (e) {
    if (e instanceof jwt.TokenExpiredError) {
      // res.status(400).json({ message: "Token expired" });
      res.render("Information", {
        title: "Information page",
        message: "You are not authorized",
        isLink: true,
        linkTitle: "Log in",
        link: "/login",
        //expiresIn: 60000,
      });
      return;
    } else if (e instanceof jwt.JsonWebTokenError) {
      // res.status(400).json({ message: "Invalid token" });
      res.render("Information", {
        title: "Information page",
        message: "You are not authorized",
        isLink: true,
        linkTitle: "Log in",
        link: "/login",
        //expiresIn: 60000,
      });
      return;
    }
  }
  //если с токеном все в порядке, обновляю токен
  TokenModel.findOne({ tokenId: payload.id })
    .exec()
    .then((token) => {
      if (token === null) {
        throw new Error("Invalid token");
      }

      return uptadeTokens(token.userId);
    })
    .then((tokens) => res.json(tokens))
    .catch((err) => res.status(400).json({ message: err.message }));
};

const logout = (req, res) => {
  //здесь должно быть обращение в БД на удаление токена для нуэного юзера

  res.render("Information", {
    title: "Information page",
    message: "You are not authorized",
    isLink: true,
    linkTitle: "Log in",
    link: "/login",
    accessToken: "",
    refreshToken: "",
    userName: "",
  });
  return;
};

module.exports = {
  signIn,
  refreshTokens,
  logout,
};
