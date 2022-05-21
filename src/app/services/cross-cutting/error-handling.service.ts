import { ErrorHandler, Injectable } from '@angular/core';
import { LoggingData } from '@models';
import { LoggingService } from '@services';

@Injectable()
export class ErrorHandlingService implements ErrorHandler {
    constructor(private loggingService: LoggingService) {}

    handleError(error) {
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