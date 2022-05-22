import { Injectable } from '@angular/core';
import { LogglyService } from 'ngx-loggly-logger';
import { LoggingFullData } from '@model';
import { environment } from '@env/environment';
import { LogWriter } from './log-writer';
import { LoggingService } from './logging.service';


/**
 * Use this writer to log information to the logentries server.
 */
@Injectable({
    providedIn: 'root'
})
export class LogglyWriter extends LogWriter {

    constructor(loggingService: LoggingService, private loggly: LogglyService) {
        super(loggingService)
        // console.info('Init LogentriesWriter')
    }

    override preWritting() {
        if(!environment.production || !this.configs.logglyToken) {
            return
        }
        try {
            this.loggly.push({
                logglyKey: this.configs.logglyToken,
                tag: 'nhannguyendacoder'
            });
        } catch (error: any) {
            const message = `${this.targetEntry['application']}.LogglyWriter: ${{ ...error }}`;
            console.error(message);
        }
    }

    /**
     * Implementation of the abstract method. This will perform the
     * actual `write` action for the specified writer.
     */
    write(): void {
        if(!environment.production || !this.configs.logglyToken) {
            return
        }

        // let log = this.formatEntry(this.targetEntry)
        let log = {
            ...this.targetEntry,
            timestamp: new Date(this.targetEntry?.timestamp).toISOString(),
        }
        this.loggly.push(log);
    }

    /**
     * Use this function to format a specified [Log Entry] item. This should be moved
     * to a specific [formatter] service that can be injected into the specified
     * writer.
     * @param logEntry
     */
    private formatEntry(logEntry: LoggingFullData): string {
        return `
            timestamp: ${new Date(logEntry?.timestamp).toISOString()}; 
            application: ${logEntry?.['application']}; 
            level: ${logEntry?.level}; 
            message: ${logEntry?.message}; 
            action: ${logEntry?.action}; 
            errorCode: ${logEntry?.errorCode}; 
            errorName: ${logEntry?.errorName}; 
            stack: ${logEntry?.stack}; 
        `
    }
}
