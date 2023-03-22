import { EventDefinition, EventName } from "../../components/EventDefinition";
import { getObjectTypeName, ObjectType } from "../../shared/object-type";
import { IComponentDescriptor } from "./IComponentDescriptor";

export class ComponentType {
    private _properties: string[];

    private _events: EventDefinition[];

    private _descriptor: IComponentDescriptor;

    public get properties(): string[] {
        return [...this._properties];
    }

    public get events(): EventDefinition[] {
        return [...this._events];
    }

    public get descriptor(): IComponentDescriptor {
        return this._descriptor;
    }

    public readonly name: string;

    constructor(public readonly type: ObjectType) {
        this._properties = [];
        this._events = [];
        this._descriptor = { selector: "" };
        this.name = getObjectTypeName(type);
        this.type = type;
    }

    registerDescriptor(descriptor: IComponentDescriptor): void {
        this._descriptor = descriptor;
    }

    registerProperty(property: string): void {
        this._properties.push(property);
    }

    registerEvent(selector: string, event: EventName | string, listener: EventListener): void {
        this._events.push(new EventDefinition(selector, event, listener));
    }
}
