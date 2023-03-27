import { EventListenerInstance } from "./EventListenerInstance";

export type EventName = keyof HTMLElementEventMap;

export class EventDefinition {
    constructor(public readonly event: EventName | string, public readonly selector: string, public readonly func: EventListener) {}

    connect(element: HTMLElement): EventListenerInstance[] {
        const children = this.selector ? element.querySelectorAll(this.selector) : [element];
        const eventListeners: EventListenerInstance[] = [];

        if (!children) eventListeners;

        for (let i = 0; i < children.length; i++) {
            const c = children[i];
            const func = (e: Event) => {
                console.log(`${c.constructor.name}(${c.id})[${this.event}]`);
                this.func.apply(element, [e]);
            };
            c.addEventListener(this.event, func);
            eventListeners.push(new EventListenerInstance(c, this.event, func));
        }

        return eventListeners;
    }
}
