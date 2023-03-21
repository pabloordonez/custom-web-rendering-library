import { PropertyType } from "./PropertyType";

export class PropertyTypeCollection {
    private static _globalInstance: PropertyTypeCollection;

    public static get globalInstance(): PropertyTypeCollection {
        if (!PropertyTypeCollection._globalInstance) PropertyTypeCollection._globalInstance = new PropertyTypeCollection();

        return PropertyTypeCollection._globalInstance;
    }

    private readonly _registeredTypes: PropertyType[];

    private constructor() {
        this._registeredTypes = [];
    }

    register(propertyType: PropertyType): void {
        if (this.contains(propertyType.componentName, propertyType.propertyName))
            throw new Error(`The property ${propertyType.componentName}.${propertyType.propertyName} is already registered.`);

        this._registeredTypes.push(propertyType);
    }

    get(componentName: string, propertyName: string): PropertyType {
        const property = this._registeredTypes.find(x => x.propertyName === propertyName && x.componentName === componentName);

        if (!property) throw new Error(`The property ${componentName}.${propertyName} is not registered.`);

        return property;
    }

    contains(componentName: string, propertyName: string): boolean {
        const property = this._registeredTypes.find(x => x.propertyName === propertyName && x.componentName === componentName);
        return property !== null && property !== undefined;
    }

    getForComponent(componentName: string): PropertyType[] {
        return this._registeredTypes.filter(x => x.componentName === componentName);
    }

    getRegisteredPropertyTypes(): PropertyType[] {
        return this._registeredTypes.slice();
    }
}
