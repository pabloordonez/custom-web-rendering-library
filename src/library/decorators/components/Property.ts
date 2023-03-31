import { getObjectTypeName, ObjectType } from "../../dependencyInjection";
import { ComponentTypeCollection } from "./ComponentTypeCollection";
import { DecoratorResult } from "./DecoratorResult";
import { propertyToAttribute } from "./IPropertyDescriptor";

export function Property(attribute?: string): DecoratorResult {
    return (prototype: ObjectType, propertyName: string): void => {
        const component = prototype.constructor;
        const componentType = ComponentTypeCollection.globalInstance.get(component as any);
        const propertyType = getObjectTypeName(Reflect.getMetadata("design:type", prototype, propertyName)).toLowerCase();

        if (propertyType !== "string" && propertyType !== "number" && propertyType !== "boolean")
            throw new Error(
                `Wrong type for property '${propertyName}' in component '${componentType.name}'. Only string, number or boolean types are allowed.`
            );

        componentType.registerProperty(propertyName, propertyType, attribute ?? propertyToAttribute(propertyName));
    };
}
