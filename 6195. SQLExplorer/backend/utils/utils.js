const fs = require("fs");
const os = require("os");
const path = require("path");

// пишет строку в файл лога и одновременно в консоль

// асинхронная версия
function logLineAsync(logFilePath, logLine) {
  return new Promise((resolve, reject) => {
    const logDT = new Date();
    let time = logDT.toLocaleDateString() + " " + logDT.toLocaleTimeString();
    let fullLogLine = time + " " + logLine;

    console.log(fullLogLine); // выводим сообщение в консоль

    fs.open(logFilePath, "a+", (err, logFd) => {
      if (err) reject(err);
      else
        fs.write(logFd, fullLogLine + os.EOL, (err) => {
          if (err) reject(err);
          else
            fs.close(logFd, (err) => {
              if (err) reject(err);
              else resolve();
            });
        });
    });
  });
}

const port = 6195;

const logFN = path.join(__dirname, "../_server.log"); //логирование

module.exports = {
  logLineAsync,
  port,
  logFN,
};
