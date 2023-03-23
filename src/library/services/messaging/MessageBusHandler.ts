import { MessageHandler } from "./MessageHandler";
import { RegistrationToken } from "./RegistrationToken";
import { MessageBusService } from "./MessageBus";
import { ObjectType } from "library/dependencyInjection";

/**
 * Represents a message bus callback handler.
 * It holds a method that must be called when certain
 * message is received.
 */
export class MessageBusHandler<T = any> {
    /**
     * The registration token that identifies this handler.
     */
    private innerToken: RegistrationToken<T>;

    /**
     * The handler or function that should be called when the message is received.
     */

    private innerHandler: MessageHandler<T>;

    /**
     * Gets the registration token that identifies this handler.
     */
    get token(): RegistrationToken<T> {
        return this.innerToken;
    }

    /**
     * Gets the handler function that should be called when the message is received.
     */
    get handler(): MessageHandler<T> {
        return this.innerHandler;
    }

    /**
     * Creates a new instance of @see MessageBusHandler
     * @param messageBus a reference to the message bus.
     * @param type the message type.
     * @param handler the message handler.
     */
    constructor(messageBus: MessageBusService, type: ObjectType<T>, handler: MessageHandler<T>) {
        this.innerHandler = handler;
        this.innerToken = new RegistrationToken(messageBus, type);
    }
}
