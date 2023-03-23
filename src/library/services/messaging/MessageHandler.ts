/**
 * Represents a message bus event handler.
 */
export type MessageHandler<T = any> = (message: T) => void | Promise<void>;