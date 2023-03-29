import { MessageHandler } from "./MessageHandler";
import { RegistrationToken } from "./RegistrationToken";
import { MessageBusHandler } from "./MessageBusHandler";
import { Injectable, DependencyLifeTime, ObjectType } from "library/dependencyInjection";

@Injectable({ lifeTime: DependencyLifeTime.Singleton })
export class MessageBusService {
    /**
     * A collection of message types and all their handlers or observers.
     */
    private handlers: Map<ObjectType, MessageBusHandler[]>;

    /**
     * Creates a new instance of @see MessageBusService
     */
    constructor() {
        this.handlers = new Map<ObjectType, MessageBusHandler[]>();
    }

    /**
     * Gets the amount of messages registered.
     */
    count(): number {
        return this.handlers.values.length;
    }

    /**
     * Indicates if the given message type is registered and has handlers associated to it.
     * @param messageType the message type.
     */
    isRegistered<T>(messageType: ObjectType<T>): boolean {
        return this.handlers.has(messageType);
    }

    /**
     * Gets the amount of handler or observers a given message has.
     * @param messageType the message type.
     */
    handlerCount<T>(messageType: ObjectType<T>): number {
        if (!this.handlers.has(messageType)) return 0;

        return this.handlers.get(messageType)?.length || 0;
    }

    /**
     * Registers a new message handler.
     * The handler will be called every time a message of @see messageType is called.
     * @param messageType the message type.
     * @param handler the message handler.
     */
    register<T>(messageType: ObjectType<T>, handler: MessageHandler<T>): RegistrationToken<T> {
        if (!this.handlers.has(messageType)) this.handlers.set(messageType, []);

        const messageBusHandler = new MessageBusHandler(this, messageType, handler);
        this.handlers.get(messageType)?.push(messageBusHandler);

        return messageBusHandler.token;
    }

    /**
     * Removes a handler registration from the collection.
     * @param token the registration token.
     */
    unregister<T>(token: RegistrationToken<T>): void {
        if (!this.handlers.has(token.type)) throw new Error("Token has been already unregistered.");

        const handler = this.handlers.get(token.type);

        if (!handler) return;

        /* removes the message handlers for that guid */
        const messageHandlers = handler.filter(x => x.token.guid === token.guid);

        for (const messageHandler of messageHandlers) handler.splice(handler.indexOf(messageHandler), 1);

        /* if the handler doesn't have more message handlers, we can delete it */
        if (handler.length === 0) this.handlers.delete(token.type);
    }

    /**
     * Unregisters all the message handlers.
     */
    unregisterAll(): void {
        this.handlers.clear();
    }

    /**
     * Sends a message to all the registered handlers.
     * @param message the message to be sent.
     * @param token if specified, the message will be sent only to one handler.
     */
    async send<T>(message: T, token?: RegistrationToken<T>): Promise<void> {
        if (!message) throw new Error("Can not send a null message.");

        if (!(message as any).constructor) throw new Error("Message does not have a constructor, and the system can not infer the type.");

        if (!this.handlers.has((message as any).constructor as ObjectType<T>)) return;

        const handlers = this.handlers.get((message as any).constructor as ObjectType<T>);

        if (!handlers) return;

        const messageHandlers = handlers.filter(x => !token || token.guid === x.token.guid);

        for (const messageHandler of messageHandlers) {
            await messageHandler.handler(message);
        }
    }
}
