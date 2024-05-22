const logFilePath = "activity.log";
const { createSimpleLogger } = require("simple-node-logger");
const InterfaceLogger = require("./iLogger");

class ActivityLogger extends InterfaceLogger {
  constructor() {
    super();

    this.ActivityLogger = createSimpleLogger({
      logFilePath,
      timestampFormat: "YYYY-MM-DD HH:mm:ss.SSS",
    });
  }

  static getInstance() {
    if (!ActivityLogger.instance) {
      ActivityLogger.instance = new ActivityLogger();
    }
    return ActivityLogger.instance;
  }

  log(data) {
    const { action, message, user } = data;
    this.ActivityLogger.info(
      `User: ${user}, action: ${action}, message: ${message}`
    );
  }
}
module.exports = ActivityLogger;