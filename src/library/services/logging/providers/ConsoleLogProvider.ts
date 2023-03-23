import ILogProvider from "./ILogProvider";

export default class LogProvider implements ILogProvider {
    /**
     * Adds a trace log.
     * @param message the message to be logged.
     * @param [optionalParams = null] the optional parameters array.
     */
    trace(message: string, optionalParams?: Array<any>): void {
        optionalParams ? console.trace(message, optionalParams) : console.trace(message);
    }

    /**
     * Adds a debug log.
     * @param message the message to be logged.
     * @param [optionalParams = null] the optional parameters array.
     */
    log(message: string, optionalParams?: Array<any>): void {
        optionalParams ? console.log(message, optionalParams) : console.log(message);
    }

    /**
     * Adds an information log.
     * @param message the message to be logged.
     * @param [optionalParams = null] the optional parameters array.
     */
    info(message: string, optionalParams?: Array<any>): void {
        optionalParams ? console.info(message, optionalParams) : console.info(message);
    }

    /**
     * Adds a warning log.
     * @param message the message to be logged.
     * @param [optionalParams = null] the optional parameters array.
     */
    warn(message: string, optionalParams?: Array<any>): void {
        optionalParams ? console.warn(message, optionalParams) : console.warn(message);
    }

    /**
     * Adds an error log.
     * @param message the message to be logged.
     * @param [optionalParams = null] the optional parameters array.
     */
    error(message: string, optionalParams?: Array<any>): void {
        optionalParams ? console.error(message, optionalParams) : console.error(message);
    }
}
