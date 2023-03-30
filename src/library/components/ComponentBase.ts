import { DependencyContainer, DependencyCollection } from "library/dependencyInjection";
import LoggingService from "library/services/logging/LoggingService";
import { MessageBusService } from "library/services/messaging/MessageBus";
import { RegistrationToken } from "library/services/messaging/RegistrationToken";
import { EventHandlerInstance, ComponentTypeCollection, ComponentType } from "../decorators/components";

const globalContainer = DependencyCollection.globalCollection.buildContainer(false);

export class ComponentBase extends HTMLElement {
    private readonly _componentType: ComponentType;

    private readonly _dependencyContainer: DependencyContainer;

    private readonly _eventHandlerInstances: EventHandlerInstance[];

    private readonly _messageHandlerTokens: RegistrationToken[];

    private readonly _messageBus: MessageBusService;

    private readonly _logger: LoggingService;

    protected get dependencyContainer(): DependencyContainer {
        return this._dependencyContainer;
    }

    protected get componentType(): ComponentType {
        return this._componentType;
    }

    protected get messageBus(): MessageBusService {
        return this._messageBus;
    }

    protected get logger(): LoggingService {
        return this._logger;
    }

    constructor() {
        super();
        this._componentType = ComponentTypeCollection.globalInstance.get(this.constructor as any);
        this._eventHandlerInstances = [];
        this._messageHandlerTokens = [];
        this._dependencyContainer = this.getDependencyContainer();
        this._messageBus = this._dependencyContainer.resolve(MessageBusService);
        this._logger = this._dependencyContainer.resolve(LoggingService);
    }

    connectedCallback(): void {
        this.invalidate();
        this.onCreated();
        this.connectMessageHandlers();
    }

    disconnectedCallback(): void {
        this.onRemoved();
        this.disconnectEventHandlers();
        this.disconnectMessageHandlers();
    }

    invalidate(reRender: boolean = true): void {
        // if the component is not connected, does not makes sense to render.
        if (!this.isConnected) return;

        // 1. disconnect all listeners.
        this.disconnectEventHandlers();

        // 2. render the component again.
        this.beforeRender();
        if (reRender) this.innerHTML = this.render();
        this.executeQueries();
        this.afterRender();

        // 3. try to connect listeners again.
        this.connectEventHandlers();
    }

    protected attributeChangedCallback(name: string, oldValue: any, newValue: any) {
        (this as any)[name] = newValue;
        this.invalidate();
    }

    protected onCreated(): void {}

    protected onRemoved(): void {}

    protected beforeRender(): void {}

    protected render(): string {
        return "";
    }

    protected afterRender(): void {}

    private getDependencyContainer(): DependencyContainer {
        let dependencyContainer: DependencyContainer = undefined;

        if (this.componentType.descriptor.useParentDI) {
            const parentContainer = (this.parentNode as any).dependencyContainer as DependencyContainer;
            if (parentContainer) dependencyContainer = this.componentType.descriptor.useScopedDI ? parentContainer.createScopedInjector() : parentContainer;
        }

        return dependencyContainer ?? globalContainer;
    }

    private executeQueries(): void {
        const queries = this.componentType.queries;

        for (const key of queries.keys()) {
            const descriptor = queries.get(key);

            if (descriptor.multiple) {
                const result = this.querySelectorAll(descriptor.selector);
                (this as any)[key] = result ? Array.from(result) : undefined;
            } else {
                const result = this.querySelector(descriptor.selector);
                (this as any)[key] = result ? result : undefined;
            }
        }
    }

    private connectEventHandlers(): void {
        const eventHandlers = this.componentType.eventHandlers;
        this._eventHandlerInstances.splice(0);
        eventHandlers.map(x => x.connect(this)).forEach(x => this._eventHandlerInstances.push(...x));
    }

    private disconnectEventHandlers(): void {
        this._eventHandlerInstances.forEach(x => x.disconnect());
        this._eventHandlerInstances.splice(0);
    }

    private connectMessageHandlers(): void {
        this.disconnectMessageHandlers();
        const messageHandlers = this.componentType.messageHandlers;
        messageHandlers.map(x => this.messageBus.register(x.messageType, m => x.method.call(this, m))).forEach(x => this._messageHandlerTokens.push(x));
    }

    private disconnectMessageHandlers(): void {
        this._messageHandlerTokens.forEach(x => this.messageBus.unregister(x));
        this._messageHandlerTokens.splice(0);
    }
}
