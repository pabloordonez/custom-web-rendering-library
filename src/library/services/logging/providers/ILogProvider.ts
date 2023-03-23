export default interface ILogProvider {
    /**
     * Adds a trace log.
     * @param message the message to be logged.
     * @param [optionalParams = null] the optional parameters array.
     */
    trace(message: string, optionalParams?: Array<any>): void;

    /**
     * Adds a debug log.
     * @param message the message to be logged.
     * @param [optionalParams = null] the optional parameters array.
     */
    log(message: string, optionalParams?: Array<any>): void;

    /**
     * Adds an information log.
     * @param message the message to be logged.
     * @param [optionalParams = null] the optional parameters array.
     */
    info(message: string, optionalParams?: Array<any>): void;

    /**
     * Adds a warning log.
     * @param message the message to be logged.
     * @param [optionalParams = null] the optional parameters array.
     */
    warn(message: string, optionalParams?: Array<any>): void;

    /**
     * Adds an error log.
     * @param message the message to be logged.
     * @param [optionalParams = null] the optional parameters array.
     */
    error(message: string, optionalParams?: Array<any>): void;
}
