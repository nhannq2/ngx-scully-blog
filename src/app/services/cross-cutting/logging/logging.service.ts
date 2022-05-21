import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { ILoggingData } from '@models';

@Injectable({
    providedIn: 'root'
})
export class LoggingService {
    private logEntriesSubject = new ReplaySubject<ILoggingData>(1)
    logEntries$ = this.logEntriesSubject.asObservable()

    constructor() {
        // console.info('Init LoggingService')
    }

    info(data: ILoggingData) {
        this.log({level: 'info', ...data})
    }

    warn(data: ILoggingData) {
        this.log({level: 'warn', ...data})
    }

    error(data: ILoggingData) {
        this.log({level: 'error', ...data})
    }

    debug(data: ILoggingData) {
        this.log({level: 'debug', ...data})
    }

    
    private log(data: ILoggingData) {
        this.logEntriesSubject.next(data)
    }
}