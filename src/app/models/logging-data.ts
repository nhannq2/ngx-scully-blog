export interface LoggingData {
    message?: string
    errorName?: string
    errorCode?: number
    stack?: string
    action?: string
    [name: string]: any
}

// for internal use in logging service only
export interface LoggingFullData extends LoggingData {
    applicationName: string
    timestamp: number
    level: LoggingLevel
}

export type LoggingLevel = 'error' | 'warn' | 'info'