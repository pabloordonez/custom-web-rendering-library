import { IComponentDescriptor } from "./IComponentDescriptor";
import { ComponentTypeCollection } from "./ComponentTypeCollection";
import { ObjectType } from "../../dependencyInjection";

export function Component(descriptor: IComponentDescriptor): <T>(controller: ObjectType<T>) => void {
    return <T>(component: ObjectType<T>): void => {
        const componentType = ComponentTypeCollection.globalInstance.get(component);
        componentType.registerDescriptor(descriptor);
    };
}
