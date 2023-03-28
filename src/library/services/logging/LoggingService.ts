import { Injectable, DependencyLifeTime } from "library/dependencyInjection";
import ConsoleLogProvider from "./providers/ConsoleLogProvider";
import ILogProvider from "./providers/ILogProvider";

export enum LogType {
    Trace = 0,
    Debug,
    Info,
    Warning,
    Error,
}

@Injectable({ lifeTime: DependencyLifeTime.Singleton })
export default class LoggingService implements ILogProvider {
    private minimumLogLevel: LogType;

    private provider: ILogProvider;

    constructor() {
        this.minimumLogLevel = LogType.Trace;
        this.provider = new ConsoleLogProvider();
    }

    /**
     * Set the log provider.
     * @param provider the log provider.
     */
    setLogProvider(provider: ILogProvider) {
        this.provider = provider;
    }

    /**
     * Returns the log provider.
     * @returns Returns a derived @see LogProvider
     */
    getLogProvider(): ILogProvider {
        return this.provider;
    }

    /**
     * Set the minimum log level.
     * @param type the type of log.
     */
    setMinimumLevel(type: LogType) {
        this.minimumLogLevel = type;
    }

    /**
     * Adds a trace log.
     * @param message the message to be logged.
     * @param [optionalParams = null] the optional parameters array.
     */
    trace(message: string, optionalParams?: Array<any>): void {
        this.writeLog(LogType.Trace, message, optionalParams);
    }

    /**
     * Adds a debug log.
     * @param message the message to be logged.
     * @param [optionalParams = null] the optional parameters array.
     */
    log(message: string, optionalParams?: Array<any>): void {
        this.writeLog(LogType.Debug, message, optionalParams);
    }

    /**
     * Adds an information log.
     * @param message the message to be logged.
     * @param [optionalParams = null] the optional parameters array.
     */
    info(message: string, optionalParams?: Array<any>): void {
        this.writeLog(LogType.Info, message, optionalParams);
    }

    /**
     * Adds a warning log.
     * @param message the message to be logged.
     * @param [optionalParams = null] the optional parameters array.
     */
    warn(message: string, optionalParams?: Array<any>): void {
        this.writeLog(LogType.Warning, message, optionalParams);
    }

    /**
     * Adds an error log.
     * @param message the message to be logged.
     * @param [optionalParams = null] the optional parameters array.
     */
    error(message: string, optionalParams?: Array<any>): void {
        this.writeLog(LogType.Error, message, optionalParams);
    }

    /**
     * Adds an exception error to the logs.
     * @param error Error to be added.
     */
    exception(error: any): void {
        if (error instanceof Error) {
            this.error(error.message);
        } else if (error["toString"]) {
            this.error(error.toString());
        } else {
            this.error(`Unexpected error: ${error}`);
        }
    }

    /**
     * Writes the log.
     * @param type the type of log.
     * @param message the message to be logged.
     * @param [optionalParams = null] the optional parameters array.
     */
    writeLog(type: LogType, message: string, optionalParams?: Array<any>): void {
        if (type < this.minimumLogLevel) return;

        const date = new Date();
        message = `[${date.toJSON()}][${LogType[type].toUpperCase()}] - ${message}`;

        switch (type) {
            case LogType.Trace:
                this.provider.trace(message, optionalParams);
                break;

            case LogType.Debug:
                this.provider.log(message, optionalParams);
                break;

            case LogType.Info:
                this.provider.info(message, optionalParams);
                break;

            case LogType.Warning:
                this.provider.warn(message, optionalParams);
                break;

            case LogType.Error:
                this.provider.error(message, optionalParams);
                break;

            default:
                break;
        }
    }
}