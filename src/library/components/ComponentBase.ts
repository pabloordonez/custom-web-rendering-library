import { DependencyContainer, DependencyCollection } from "library/dependencyInjection";
import { EventListenerInstance, ComponentTypeCollection } from "../decorators/components";

type RefMap = { [key: string]: Element };

const globalContainer = DependencyCollection.globalCollection.buildContainer(false);

export class ComponentBase extends HTMLElement {
    private _dependencyContainer: DependencyContainer;

    private _refs: { [key: string]: Element };

    private _eventListenerInstances: EventListenerInstance[];

    protected get refs(): RefMap {
        return this._refs;
    }

    protected get dependencyContainer(): DependencyContainer {
        return this._dependencyContainer;
    }

    constructor() {
        super();
        this._refs = {};
        this._eventListenerInstances = [];
        this.initializeDependencyContainer();
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
        this.processReferences();
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

    private initializeDependencyContainer(): void {
        const derivedType = this.constructor as any;
        let dependencyContainer: DependencyContainer = undefined;

        if (derivedType.useParentDependencyContainer) {
            const parentContainer = (this.parentNode as any).dependencyContainer as DependencyContainer;
            if (parentContainer) dependencyContainer = derivedType.scopedDependencyContainer ? parentContainer.createScopedInjector() : parentContainer;
        }

        this._dependencyContainer = dependencyContainer ?? DependencyCollection.globalCollection.buildContainer();
    }

    private processReferences(): void {
        const elements = this.querySelectorAll("[ref]");

        elements.forEach(element => {
            this.refs[element.getAttribute("ref")] = element;
        });
    }

    private connectEvents(): void {
        const componentType = ComponentTypeCollection.globalInstance.get(this.constructor as any);
        const listeners = componentType.events;
        this._eventListenerInstances = listeners.map(x => x.connect(this)).reduce((p, c) => p.concat(c));
    }

    private disconnectEvents(): void {
        this._eventListenerInstances.forEach(x => x.disconnect());
    }
}
