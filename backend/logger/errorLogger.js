const { createSimpleLogger } = require("simple-node-logger");
const InterfaceLogger = require("./iLogger");
const logFilePath = "app_errors.log";

class errorLogger extends InterfaceLogger {
  constructor() {
    super();

    this.logger = createSimpleLogger({
      logFilePath,
      timestampFormat: "YYYY-MM-DD HH:mm:ss.SSS",
    });
  }

  static getInstance() {
    if (!errorLogger.instance) {
      errorLogger.instance = new errorLogger();
    }
    return errorLogger.instance;
  }

  log(data) {
    const { message } = data;
    this.logger.error(message);
  }
}

module.exports = errorLogger;