import { ErrorHandler, Injectable } from '@angular/core';
import { ILoggingData } from '@models';
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

    private handleErrorFunc(errorData: ILoggingData) {
        this.loggingService.error(errorData)
    }
}