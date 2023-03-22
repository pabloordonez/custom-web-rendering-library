import { IComponentDescriptor } from "./IComponentDescriptor";
import { ComponentTypeCollection } from "./ComponentTypeCollection";
import { ObjectType } from "../../shared/object-type";

export function Component(descriptor: IComponentDescriptor): <T>(controller: ObjectType<T>) => void {
    if (!descriptor) throw new Error("The component descriptor is mandatory.");

    return <T>(component: ObjectType<T>): void => {
        if (!component) throw new Error("Can not decorate a null or undefined value as a component.");
        const componentType = ComponentTypeCollection.globalInstance.get(component);
        componentType.registerDescriptor(descriptor);
    };
}
