export interface LoggingConfiguration {
    sendToConsole: boolean,
    logglyToken: string,
}

/**
 * Difine all necessary environment information.
 */
export interface Environment {
    production: boolean
    applicationName: string
    logging: LoggingConfiguration
}
