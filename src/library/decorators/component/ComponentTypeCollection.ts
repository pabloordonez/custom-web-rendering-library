import { ComponentType } from "./ComponentType";
import { PropertyTypeCollection } from "../property/PropertyTypeCollection";
import { ObjectType } from "../../shared/object-type";

export class ComponentTypeCollection {
    private static _globalInstance: ComponentTypeCollection;

    public static get globalInstance(): ComponentTypeCollection {
        if (!ComponentTypeCollection._globalInstance) ComponentTypeCollection._globalInstance = new ComponentTypeCollection();

        return ComponentTypeCollection._globalInstance;
    }

    private readonly _registeredTypes: Map<ObjectType, ComponentType>;

    private constructor() {
        this._registeredTypes = new Map<ObjectType, ComponentType>();
    }

    register(componentType: ComponentType): void {
        if (this._registeredTypes.has(componentType.type)) throw new Error(`The component ${getObjectTypeName(componentType.type)} is already registered.`);

        this._registeredTypes.set(componentType.type, componentType);
    }

    get(component: ObjectType): ComponentType {
        const instance = this._registeredTypes.get(component);
        if (!instance) throw new Error(`The component ${getObjectTypeName(component)} is not registered.`);
        return instance;
    }

    contains(component: ObjectType): boolean {
        return this._registeredTypes.has(component);
    }

    getComponents(): IterableIterator<ComponentType> {
        return this._registeredTypes.values();
    }

    defineAll(): void {
        for(const component of this._registeredTypes.values()) {
            (component.type as any).observedAttributes = PropertyTypeCollection.globalInstance.getForComponent(component.name).map(x => x.propertyName);
            customElements.define(component.descriptor.selector, component.type, { extends: component.descriptor.extends });
        }
    }
}
function getObjectTypeName(component: ObjectType<any>) {
    throw new Error("Function not implemented.");
}

