import { ObjectType } from "../../dependencyInjection";
import { ComponentTypeCollection } from "./ComponentTypeCollection";
import { DecoratorResult } from "./DecoratorResult";

export function Query(selector: string, multiple?: boolean): DecoratorResult {
    return (prototype: ObjectType, propertyName: string): void => {
        const component = prototype.constructor;
        const componentType = ComponentTypeCollection.globalInstance.get(component as any);
        componentType.registerQuery(propertyName, { selector, multiple });
    };
}
