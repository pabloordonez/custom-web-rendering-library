import { ObjectType } from "library/dependencyInjection";
import { Guid } from "library/types/Guid";
import { MessageBusService } from "./MessageBus";

/**
 * Represents a message bus registration token.
 */
export class RegistrationToken<T = any> {
    /**
     * A reference to the @see MessageBusService.
     */
    private messageBus: MessageBusService;

    /**
     * The inner message type.
     */
    private innerType: ObjectType<T>;

    /**
     * A guid identifying this registration.
     */
    private innerGuid: Guid;

    /**
     * Gets the message type.
     */
    get type(): ObjectType<T> {
        return this.innerType;
    }

    /**
     * Gets the registration guid.
     */
    get guid(): Guid {
        return this.innerGuid;
    }

    /**
     * Creates a new instance of @see RegistrationToken
     * @param messageBus a reference to the message bus.
     * @param type the message type.
     */
    constructor(messageBus: MessageBusService, type: ObjectType<T>) {
        this.messageBus = messageBus;
        this.innerType = type;
        this.innerGuid = Guid.new();
    }

    /**
     * Removes the callback from the message bus.
     */
    unregister(): void {
        this.messageBus.unregister(this);
    }
}
