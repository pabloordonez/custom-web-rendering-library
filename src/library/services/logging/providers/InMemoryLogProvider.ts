import { LogType } from "../LoggingService";
import ILogProvider from "./ILogProvider";

interface ILogEntry {
    type: LogType;
    message: string;
    optionalParams?: any[];
}

const MAX_LOGS_ENTRIES = 1000;

export default class InMemoryLogProvider implements ILogProvider {
    logs: ILogEntry[];

    constructor() {
        this.logs = [];
    }

    /**
     * Adds a trace log.
     * @param message the message to be logged.
     * @param [optionalParams = null] the optional parameters array.
     */
    trace(message: string, optionalParams?: Array<any>): void {
        console.trace(message);
        this.registerLog(LogType.Trace, message, optionalParams);
    }

    /**
     * Adds a debug log.
     * @param message the message to be logged.
     * @param [optionalParams = null] the optional parameters array.
     */
    log(message: string, optionalParams?: Array<any>): void {
        console.log(message);
        this.registerLog(LogType.Debug, message, optionalParams);
    }

    /**
     * Adds an information log.
     * @param message the message to be logged.
     * @param [optionalParams = null] the optional parameters array.
     */
    info(message: string, optionalParams?: Array<any>): void {
        console.info(message);
        this.registerLog(LogType.Info, message, optionalParams);
    }

    /**
     * Adds a warning log.
     * @param message the message to be logged.
     * @param [optionalParams = null] the optional parameters array.
     */
    warn(message: string, optionalParams?: Array<any>): void {
        console.warn(message);
        this.registerLog(LogType.Warning, message, optionalParams);
    }

    /**
     * Adds an error log.
     * @param message the message to be logged.
     * @param [optionalParams = null] the optional parameters array.
     */
    error(message: string, optionalParams?: Array<any>): void {
        console.error(message);
        this.registerLog(LogType.Error, message, optionalParams);
    }

    /**
     * Registers the log entry.
     * @param type the type of log.
     * @param message the message to be logged.
     * @param [optionalParams = null] the optional parameters array.
     */
    registerLog(type: LogType, message: string, optionalParams?: Array<any>): void {
        this.logs.push({ type, message, optionalParams });

        if (this.logs.length >= MAX_LOGS_ENTRIES) {
            this.logs.splice(0, 1);
        }
    }
}
