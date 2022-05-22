import { Injectable } from '@angular/core';
import { LogWriter } from './log-writer';
import { LoggingService } from './logging.service';


/**
 * Use this writer to log information to the browser console.
 */
@Injectable({
    providedIn: 'root'
})
export class ConsoleWriter extends LogWriter {
    constructor(loggingService: LoggingService) {
        super(loggingService)
        // console.info('Init ConsoleWriter')
    }

    /**
     * Implementation of the abstract method. This will perform the
     * actual `write` action for the specified writer.
     */
    public write(): void {
        if (!this.configs.sendToConsole) {
            return
        }
        
        switch (this.targetEntry.level) {
            case 'info':
                console.info(this.targetEntry)
                break
            case 'warn':
                console.warn(this.targetEntry)
                break
            case 'error':
                console.error(this.targetEntry)
                break
            default:
                break
        }
    }
}
