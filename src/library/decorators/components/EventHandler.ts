import { EventName, EventTargetSource } from "./EventHandlerDefinition";
import { ObjectType } from "../../dependencyInjection";
import { ComponentTypeCollection } from "./ComponentTypeCollection";

export function EventHandler(event: EventName | string, source?: string | EventTargetSource): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void {
    return (prototype: ObjectType, methodName: string, _: PropertyDescriptor): void => {
        const component = prototype.constructor;
        const componentType = ComponentTypeCollection.globalInstance.get(component as any);
        componentType.registerEvent(event, source, component.prototype[methodName]);
    };
}
