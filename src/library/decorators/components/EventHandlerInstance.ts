import { EventName } from "./EventHandlerDefinition";

export class EventHandlerInstance {
    constructor(public readonly element: Element, public readonly event: EventName | string, public readonly func: EventListener) {}

    disconnect(): void {
        this.element.removeEventListener(this.event, this.func);
    }
}
