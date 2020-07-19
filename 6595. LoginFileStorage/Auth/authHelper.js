const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const { jwtSecret, tokensConfig } = require("../local").jwtConfig;

import TokenModel from "../models/token";

const generateAccessToken = (userId) => {
  const payload = {
    userId,
    type: tokensConfig.access.type,
  };
  const options = { expiresIn: tokensConfig.access.expiresIn };

  return jwt.sign(payload, jwtSecret, options);
};

const generateRefreshToken = () => {
  const payload = {
    id: uuidv4(),
    type: tokensConfig.refresh.type,
  };
  const options = { expiresIn: tokensConfig.refresh.expiresIn };

  return {
    id: payload.id,
    token: jwt.sign(payload, jwtSecret, options),
  };
};

const replaceDbRefreshToken = (tokenId, userId) => {
  TokenModel.findOneAndRemove({ userId })
    .exec()
    .then(() => TokenModel.create({ tokenId, userId }));
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  replaceDbRefreshToken,
};
