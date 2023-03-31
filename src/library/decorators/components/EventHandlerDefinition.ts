import { EventHandlerInstance as EventHandlerInstance } from "./EventHandlerInstance";

export type EventName = keyof HTMLElementEventMap;

export enum EventTargetSource {
    element,
    document,
    window
}

export class EventHandlerDefinition {
    constructor(public readonly event: EventName | string, public readonly source: EventTargetSource | string, public readonly func: EventListener) {}

    connect(targetElement: HTMLElement): EventHandlerInstance[] {
        if (typeof this.source === "string") {
            const children = this.source ? targetElement.querySelectorAll<HTMLElement>(this.source) : [targetElement];
            const eventListeners: EventHandlerInstance[] = [];

            if (!children) eventListeners;

            for (let i = 0; i < children.length; i++) {
                const sourceElement = children[i];
                eventListeners.push(this.registerEventHandler(targetElement, sourceElement));
            }

            return eventListeners;
        } else {
            function getElement(elementSource: EventTargetSource): EventTarget {
                switch (elementSource) {
                    case EventTargetSource.document:
                        return document;
                    case EventTargetSource.window:
                        return window;
                    default:
                        return targetElement;
                }
            }

            const sourceElement = getElement(this.source);
            return [this.registerEventHandler(targetElement, sourceElement)];
        }
    }

    private registerEventHandler(targetElement: HTMLElement, sourceElement: EventTarget): EventHandlerInstance {
        const func = (e: Event) => this.func.apply(targetElement, [e]);
        sourceElement.addEventListener(this.event, func);
        return new EventHandlerInstance(sourceElement, this.event, func);
    }
}
