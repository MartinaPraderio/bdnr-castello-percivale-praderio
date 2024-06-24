const logFilePath = "authorization.log";
const { createSimpleLogger } = require("simple-node-logger");
const InterfaceLogger = require("./iLogger");

class AuthorizationLogger extends InterfaceLogger {
  constructor() {
    super();

    this.AuthorizationLogger = createSimpleLogger({
      logFilePath,
      timestampFormat: "YYYY-MM-DD HH:mm:ss.SSS",
    });
  }

  static getInstance() {
    if (!AuthorizationLogger.instance) {
      AuthorizationLogger.instance = new AuthorizationLogger();
    }
    return AuthorizationLogger.instance;
  }

  log(data) {
    const { message } = data;
    this.AuthorizationLogger.info(message);
  }
}
module.exports = AuthorizationLogger;