import { Event, EventListener, EventName } from "./EventListener";

export class ComponentBase extends HTMLElement {
    protected _listeners: Array<EventListener>;

    constructor() {
        super();
        this._listeners = [];
    }

    connectedCallback(): void {
        this.invalidate();
        this.onCreated();
    }

    disconnectedCallback(): void {
        this.onRemoved();
        this.unregisterAll();
    }

    protected onCreated(): void {}

    protected onRemoved(): void {}

    protected beforeRender(): void {}

    protected render(): string {
        return "";
    }

    protected afterRender(): void {}

    protected registerEvent(selector: string, event: EventName, func: Event): EventListener {
        const eventListener = new EventListener(this, selector, event, func);
        this._listeners.push(eventListener);
        return eventListener;
    }

    protected unregisterEvent(eventListener: EventListener): void {
        this._listeners.splice(this._listeners.indexOf(eventListener), 1);
    }

    protected unregisterAll(): void {
        this._listeners.forEach(x => this.unregisterEvent(x));
    }

    protected attributeChangedCallback(name: string, oldValue: any, newValue: any) {
        console.log(`Property ${name} changed [${oldValue} -> ${newValue}]`);
        (this as any)[name] = newValue;
        this.invalidate();
    }

    protected invalidate(): void {
        // 1. disconnect all listeners.
        this._listeners.forEach(x => x.disconnect());

        // 2. render the component again.
        this.beforeRender();
        this.innerHTML = this.render();
        this.afterRender();

        // 3. try to connect listeners again.
        this._listeners.forEach(x => {
            if (!x.connect()) console.log(`Event ${x.event} for selector ${x.selector} not connected.`);
        });
    }
}
