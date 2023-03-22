import { ComponentType } from "./ComponentType";
import { getObjectTypeName, ObjectType } from "../../shared/object-type";

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

    get(component: ObjectType): ComponentType {
        if (!this._registeredTypes.has(component)) this._registeredTypes.set(component, new ComponentType(component));
        return this._registeredTypes.get(component);
    }

    contains(component: ObjectType): boolean {
        return this._registeredTypes.has(component);
    }

    getComponents(): IterableIterator<ComponentType> {
        return this._registeredTypes.values();
    }

    defineAll(): void {
        for (const component of this._registeredTypes.values()) {
            (component.type as any).observedAttributes = component.properties;
            customElements.define(component.descriptor.selector, component.type, { extends: component.descriptor.extends });
        }
    }
}
