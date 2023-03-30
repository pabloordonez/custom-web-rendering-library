import { ObjectType } from "../../dependencyInjection";
import { ComponentTypeCollection } from "./ComponentTypeCollection";

export function MessageHandler(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void {
    return (prototype: ObjectType, methodName: string, _: PropertyDescriptor): void => {
        const component = prototype.constructor;
        const componentType = ComponentTypeCollection.globalInstance.get(component as any);
        const method = component.prototype[methodName];
        const args = Reflect.getMetadata("design:paramtypes", prototype, methodName) || [];

        if (!args || args.length !== 1)
            throw new Error("Invalid declaration for a message handler. A message handler is expected to have only one argument, and the argument must be the expected message type. Example: private onLoadingMessage(message: LoadingMessage): void { ... }");

        componentType.registerMessage(methodName, method, args[0] as ObjectType);
    };
}
