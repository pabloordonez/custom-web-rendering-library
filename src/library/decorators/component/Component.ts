import { IComponentDescriptor } from "./IComponentDescriptor";
import { ComponentTypeCollection } from "./ComponentTypeCollection";
import { ComponentType } from "./ComponentType";
import { getObjectTypeName, ObjectType } from "../../shared/object-type";

export function Component(descriptor: IComponentDescriptor): <T>(controller: ObjectType<T>) => void {
    if (!descriptor) throw new Error("The controller descriptor is mandatory.");

    return <T>(component: ObjectType<T>): void => {
        if (!component) throw new Error("Can not decorate a null or undefined value as a controller.");
        if (ComponentTypeCollection.globalInstance.contains(component)) throw new Error(`The controller ${getObjectTypeName(component)} is already registered.`);
        ComponentTypeCollection.globalInstance.register(new ComponentType(component, descriptor));
    };
}
