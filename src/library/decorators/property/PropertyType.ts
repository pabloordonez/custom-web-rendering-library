import { getObjectTypeName, ObjectType } from "../../shared/object-type";
import { IPropertyDescriptor } from "./IPropertyDescriptor";

export class PropertyType {
    public readonly componentName: string;
    constructor(public readonly componentType: ObjectType, public readonly propertyName: string, public readonly descriptor: IPropertyDescriptor) {
        this.componentName = getObjectTypeName(componentType);
    }
}
