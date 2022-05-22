import { ErrorHandler, Injectable } from '@angular/core';
import { LoggingData } from '@model';
import { LoggingService } from '@service';

@Injectable()
export class ErrorHandlingService implements ErrorHandler {
    constructor(private loggingService: LoggingService) {}

    handleError(error: Error) {
        console.info('Handling error with ErrorHandlingService')

        this.handleErrorFunc({
            message: error?.message || 'unexpected error',
            errorName: error?.name || 'Error',
            stack: error?.stack,
        })
    }

    private handleErrorFunc(errorData: LoggingData) {
        this.loggingService.error(errorData)
    }
}