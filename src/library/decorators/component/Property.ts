import { ObjectType } from "../../shared/object-type";
import { ComponentTypeCollection } from "./ComponentTypeCollection";

type DecoratorResult = (target: any, propertyKey: string) => void;

export function Property(): DecoratorResult {
    return (prototype: ObjectType, propertyName: string): void => {
        const component = prototype.constructor;
        if (!component) throw new Error("Can not decorate a null or undefined value as a component.");
        if (!propertyName) throw new Error("Can not decorate a null or undefined property as an property.");
        const componentType = ComponentTypeCollection.globalInstance.get(component as any);
        componentType.registerProperty(propertyName);
    };
}
