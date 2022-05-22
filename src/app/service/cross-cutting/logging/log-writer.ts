import { LoggingConfiguration, LoggingData, LoggingFullData } from '@model';
import { environment } from '@env/environment';
import { LoggingService } from './logging.service';

export abstract class LogWriter {
    protected configs: LoggingConfiguration
    protected targetEntry!: LoggingFullData;
    private applicationName: string

    constructor(loggingService: LoggingService) {
        this.applicationName = environment.applicationName
        this.configs = environment.logging
        loggingService.logEntries$.subscribe(log => this.handleLogEntry(log))
    }

    /**
     * Use this method to execute the write process for the
     * specified [Log Entry] item.
     *
     * Using the [template method] design pattern.
     */
    execute() {
        this.preWritting();
        if (this.validateEntry()) {
            this.write();
        }
        this.finish();
    }

    /**
     * Use to perform an setup or configuration of the [writer].
     * The [setup] method runs on all executions of the writer - and
     * is called before the [write] method.
     */
    preWritting() {}

    /**
     * Use to validate the [log entry] before attempting to write
     * using the specified [log writer].
     *
     * Returns a [false] boolean to indicate the item is not valid.
     */
    validateEntry(): boolean {
        // no validate for now
        return true
    }

    /**
     * Use to implement the actual write of the [Log Entry].
     */
    abstract write():void;

    /**
     * Use to finish the process or clean-up any resources.
     */
    finish() { }

    private handleLogEntry(logEntry: LoggingData) {
        this.targetEntry = this.getLoggingData(logEntry)
        this.execute();
    }

    private getLoggingData(data: LoggingData): LoggingFullData {
        return {
            timestamp: new Date().getTime(),
            applicationName: this.applicationName,
            level: data['level'],
            ...data,
        }
    }
}
