import { EventHandlerInstance as EventHandlerInstance } from "./EventHandlerInstance";

export type EventName = keyof HTMLElementEventMap;

export class EventHandlerDefinition {
    constructor(public readonly event: EventName | string, public readonly selector: string, public readonly func: EventListener) {}

    connect(element: HTMLElement): EventHandlerInstance[] {
        const children = this.selector ? element.querySelectorAll(this.selector) : [element];
        const eventListeners: EventHandlerInstance[] = [];

        if (!children) eventListeners;

        for (let i = 0; i < children.length; i++) {
            const c = children[i];
            const func = (e: Event) => {
                console.log(`${c.constructor.name}(${c.id})[${this.event}]`);
                this.func.apply(element, [e]);
            };
            c.addEventListener(this.event, func);
            eventListeners.push(new EventHandlerInstance(c, this.event, func));
        }

        return eventListeners;
    }
}
