const express = require("express");
const path = require("path");
const fs = require("fs");
const router = express.Router();
const mysql = require("mysql");

const { logLineAsync, port, logFN } = require("../utils/utils");
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

let pool = mysql.createPool(poolConfig);

// READ
router.get("/groups", async (req, res) => {
  console.log("get (read) called");

  let connection = null;
  try {
    connection = await newConnectionFactory(pool, res);

    let groups = await selectQueryFactory(
      connection,
      `
            select id, name, lessons_start_dat 
            from grups
        ;`,
      []
    );

    groups = groups.map((row) => ({
      id: row.id,
      name: row.name,
      lessons_start_dat: Math.round(row.lessons_start_dat / 1000),
    }));

    res.send(groups);
  } catch (error) {
    reportServerError(error, res); // сюда прилетят любые ошибки
  } finally {
    if (connection) connection.release(); // соединение надо закрыть (вернуть в пул) независимо от успеха/ошибки
  }
});

module.exports = router;
