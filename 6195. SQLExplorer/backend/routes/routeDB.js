const express = require("express");
const path = require("path");
const fs = require("fs");
const router = express.Router();
const mysql = require("mysql");

const {
  logLineAsync,
  port,
  logFN,
  filterConditionParams,
} = require("../utils/utils");
const {
  newConnectionFactory,
  selectQueryFactory,
  modifyQueryFactory,
  getLastInsertedId,
  getModifiedRowsCount,
} = require("../utils/db_utils");

const poolConfig = {
  connectionLimit: 5, // полагаем что БД выдержит 2 соединения, т.е. в пуле будет максимум 2 соединения
  host: "localhost", // на каком компьютере расположена база данных
  user: "root", // каким пользователем подключаемся (на учебном сервере - "root")
  password: "", // каким паролем подключаемся (на учебном сервере - "1234")
  database: "learning_db", // к какой базе данных подключаемся
};

function reportServerError(error, res) {
  let data = {
    errorCode: error.errno,
    errorMessage: error.sqlMessage,
  };
  res.send(data);
  logLineAsync(logFN, `[${port}] ` + error);
}

function reportRequestError(error, res) {
  res.status(400).end();
  logLineAsync(logFN, `[${port}] ` + error);
}

let pool = mysql.createPool(poolConfig);

router.post("/getData", async (req, res) => {
  const { body } = req;
  logLineAsync(logFN, `[${port}] ` + "service /getData");
  let conditionType = filterConditionParams(body.condition);
  let connection = null;

  try {
    connection = await newConnectionFactory(pool, res);

    let data;
    switch (conditionType) {
      case "select":
      case "show":
        data = await selectQueryFactory(connection, `${body.condition}`);
        break;

      case "update":
      case "delete":
      case "insert":
      case "create":
        await modifyQueryFactory(connection, `${body.condition}`); //производит действие в бд
        data = await getModifiedRowsCount(connection); //возвращает кол-во измененных строк

        break;

      default:
        data = null;
        break;
    }

    //формирую ответ
    const dataAnswer = {
      errorCode: 0,
      errorMessage: "OK",
      type: conditionType,
      data,
    };

    const dataErrorAnswer = {
      errorCode: 7,
      errorMessage: `Incorrect or unknown type: ${conditionType}`,
    };

    res.send(data != null ? dataAnswer : dataErrorAnswer);
  } catch (error) {
    reportServerError(error, res); // сюда прилетят любые ошибки
  } finally {
    if (connection) connection.release(); // соединение надо закрыть (вернуть в пул) независимо от успеха/ошибки
  }
});

module.exports = router;
