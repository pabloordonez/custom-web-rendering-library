import { DependencyContainer, DependencyCollection } from "library/dependencyInjection";
import { EventListenerInstance, ComponentTypeCollection, ComponentType } from "../decorators/components";

const globalContainer = DependencyCollection.globalCollection.buildContainer(false);

export class ComponentBase extends HTMLElement {
    private readonly _componentType: ComponentType;

    private readonly _dependencyContainer: DependencyContainer;

    private readonly _eventListenerInstances: EventListenerInstance[];

    protected get dependencyContainer(): DependencyContainer {
        return this._dependencyContainer;
    }

    protected get componentType(): ComponentType {
        return this._componentType;
    }

    constructor() {
        super();
        this._componentType = ComponentTypeCollection.globalInstance.get(this.constructor as any);
        this._eventListenerInstances = [];
        this._dependencyContainer = this.getDependencyContainer();
    }

    connectedCallback(): void {
        this.invalidate();
        this.onCreated();
    }

    disconnectedCallback(): void {
        this.onRemoved();
        this.disconnectEvents();
    }

    invalidate(reRender: boolean = true): void {
        // if the component is not connected, does not makes sense to render.
        if (!this.isConnected) return;

        // 1. disconnect all listeners.
        this.disconnectEvents();

        // 2. render the component again.
        this.beforeRender();
        if (reRender) this.innerHTML = this.render();
        this.executeQueries();
        this.afterRender();

        // 3. try to connect listeners again.
        this.connectEvents();
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
                const result = document.querySelectorAll(descriptor.selector);
                (this as any)[key] = result ? Array.from(result) : undefined;
            } else {
                const result = document.querySelector(descriptor.selector);
                (this as any)[key] = result ? result : undefined;
            }
        }
    }

    private connectEvents(): void {
        const listeners = this.componentType.events;
        this._eventListenerInstances.splice(0);
        listeners.map(x => x.connect(this)).forEach(x => this._eventListenerInstances.push(...x));
    }

    private disconnectEvents(): void {
        this._eventListenerInstances.forEach(x => x.disconnect());
        this._eventListenerInstances.splice(0);
    }
}
