import { getObjectTypeName, ObjectType } from "../../shared/object-type";
import { IComponentDescriptor } from "./IComponentDescriptor";

export class ComponentType {
    public readonly name: string;
    constructor(public readonly type: ObjectType, public readonly descriptor: IComponentDescriptor) {
        this.name = getObjectTypeName(type);
        this.type = type;
        this.descriptor = descriptor;
    }
}
