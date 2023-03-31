import { ObjectType } from "../../dependencyInjection";
import { ComponentType } from "./ComponentType";
import { propertyToAttribute } from "./IPropertyDescriptor";

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
            Object.defineProperty(component.type, "observedAttributes", {
                value: Array.from(component.properties.values()).map(x => x.attribute ?? propertyToAttribute(x.name)),
                writable: false
            });
            customElements.define(component.descriptor.tag, component.type, { extends: component.descriptor.extends });
        }
    }
}
