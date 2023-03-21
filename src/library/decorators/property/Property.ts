
import { IPropertyDescriptor } from "./IPropertyDescriptor";
import { PropertyTypeCollection } from "./PropertyTypeCollection";
import { PropertyType } from "./PropertyType";
import "reflect-metadata";
import { getObjectTypeName, ObjectType } from "../../shared/object-type";

type DecoratorResult = (target: any, propertyKey: string) => void;

export function Property(propertyDescriptor?: IPropertyDescriptor): DecoratorResult {
    return (component: ObjectType, methodName: string): void => {
        const componentName = getObjectTypeName(component);

        if (!component) throw new Error("Can not decorate a null or undefined value as a component.");
        if (!methodName) throw new Error("Can not decorate a null or undefined method as an property.");

        if (PropertyTypeCollection.globalInstance.contains(componentName, methodName))
            throw new Error(`The property '${componentName}.${methodName}' was already registered.`);

        if (!propertyDescriptor) propertyDescriptor = {} as IPropertyDescriptor;
        const propertyType = new PropertyType(component.constructor as ObjectType, methodName, propertyDescriptor);

        PropertyTypeCollection.globalInstance.register(propertyType);
    };
}
