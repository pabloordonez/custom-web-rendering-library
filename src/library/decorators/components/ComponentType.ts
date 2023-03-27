import { EventDefinition, EventName } from "./EventDefinition";
import { ObjectType, getObjectTypeName } from "../../dependencyInjection";
import { IComponentDescriptor } from "./IComponentDescriptor";
import { IQueryDescriptor } from "./IQueryDescriptor";

export class ComponentType {
    private _properties: string[];

    private _events: EventDefinition[];

    private _queries: Map<string, IQueryDescriptor>;

    private _descriptor: IComponentDescriptor;

    public get properties(): ReadonlyArray<string> {
        return this._properties;
    }

    public get events(): ReadonlyArray<EventDefinition> {
        return this._events;
    }

    public get queries(): ReadonlyMap<string, IQueryDescriptor> {
        return this._queries;
    }

    public get descriptor(): Readonly<IComponentDescriptor> {
        return this._descriptor;
    }

    public readonly name: string;

    constructor(public readonly type: ObjectType) {
        this._properties = [];
        this._events = [];
        this._queries = new Map<string, IQueryDescriptor>();
        this._descriptor = { tag: "" };
        this.name = getObjectTypeName(type);
        this.type = type;
    }

    registerDescriptor(descriptor: IComponentDescriptor): void {
        this._descriptor = descriptor;
    }

    registerProperty(property: string): void {
        this._properties.push(property);
    }

    registerEvent(event: EventName | string, selector: string, listener: EventListener): void {
        this._events.push(new EventDefinition(event, selector, listener));
    }

    registerQuery(name: string, descriptor: IQueryDescriptor): void {
        this._queries.set(name, descriptor);
    }
}
