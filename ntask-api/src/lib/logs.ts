import fs from "fs";
import winston from "winston";

if (!fs.existsSync("logs")) {
   fs.mkdirSync("logs");
}

const logger = winston.createLogger({
   level: "info",
   transports: [
      new winston.transports.File({
         filename: "logs/app.log",
         maxsize: 1048576, // 1 MB
         maxFiles: 10,
      }),
   ],
});

export default logger;
