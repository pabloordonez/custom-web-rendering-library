import { ObjectType } from "../../dependencyInjection";
import { ComponentTypeCollection } from "./ComponentTypeCollection";
import { DecoratorResult } from "./DecoratorResult";

export function Property(): DecoratorResult {
    return (prototype: ObjectType, propertyName: string): void => {
        const component = prototype.constructor;
        const componentType = ComponentTypeCollection.globalInstance.get(component as any);
        componentType.registerProperty(propertyName);
    };
}
