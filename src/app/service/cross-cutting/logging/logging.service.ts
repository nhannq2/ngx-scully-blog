import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { LoggingData } from '@model';

@Injectable({
    providedIn: 'root'
})
export class LoggingService {
    private logEntriesSubject = new ReplaySubject<LoggingData>(1)
    logEntries$ = this.logEntriesSubject.asObservable()

    constructor() {
        // console.info('Init LoggingService')
    }

    info(data: LoggingData) {
        this.log({level: 'info', ...data})
    }

    warn(data: LoggingData) {
        this.log({level: 'warn', ...data})
    }

    error(data: LoggingData) {
        this.log({level: 'error', ...data})
    }

    debug(data: LoggingData) {
        this.log({level: 'debug', ...data})
    }

    
    private log(data: LoggingData) {
        this.logEntriesSubject.next(data)
    }
}