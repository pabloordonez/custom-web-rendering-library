import { EventName } from "../../components/EventDefinition";
import { ObjectType } from "../../shared/object-type";
import { ComponentTypeCollection } from "./ComponentTypeCollection";

export function EventHandler(selector: string, event: EventName | string): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void {
    return (prototype: ObjectType, methodName: string, _: PropertyDescriptor): void => {
        const component = prototype.constructor;
        if (!component) throw new Error("Can not decorate a null or undefined value as a component.");
        if (!methodName) throw new Error("Can not decorate a null or undefined method as an event.");
        const componentType = ComponentTypeCollection.globalInstance.get(component as any);
        componentType.registerEvent(selector, event, component.prototype[methodName]);
    };
}
