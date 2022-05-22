import { ConsoleWriter } from './console-writer';
import { LoggingService } from './logging.service';
import { LogglyWriter } from './loggly-writer';

export function InitLoggingAndWriters(
  loggingService: LoggingService, 
  consoleWriter: ConsoleWriter, 
  logglyWriter: LogglyWriter
) {
  console.info("InitLoggingAndWriters")
  return () => {
    return consoleWriter;
  };
}