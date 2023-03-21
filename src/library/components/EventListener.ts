export type Event<TArg = any> = (e: TArg) => void;
export type EventName = keyof HTMLElementEventMap;

export class EventListener {
    private _connected: boolean;

    get connected(): boolean {
        return this._connected;
    }

    constructor(public readonly parent: HTMLElement, public readonly selector: string, public readonly event: EventName, public readonly func: Event) {}

    connect(): boolean {
        try {
            if (this._connected) this.disconnect();
            const element = this.parent.querySelector(this.selector);
            if (!element) return false;

            element.addEventListener(this.event, this.func);
            this._connected = true;
            return true;
        } catch {
            return false;
        }
    }

    disconnect(): void {
        try {
            if (!this._connected) return;
            const element = this.parent.querySelector(this.selector);
            if (!element) return;

            element.removeEventListener(this.event, this.func);
            this._connected = false;
        } catch {
            // TODO: replace with logger
            console.error(`Problems disconnecting the event '${this.event}' for element '${this.selector}'.`);
        }
    }
}
