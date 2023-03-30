import { EventHandlerDefinition, EventName } from "./EventHandlerDefinition";
import { ObjectType, getObjectTypeName } from "../../dependencyInjection";
import { IComponentDescriptor } from "./IComponentDescriptor";
import { IQueryDescriptor } from "./IQueryDescriptor";
import { IMessageHandlerDescriptor } from "./IMessageHandlerDescriptor";

export class ComponentType {
    private _properties: string[];

    private _eventHandlers: EventHandlerDefinition[];

    private _messageHandlers: IMessageHandlerDescriptor[];

    private _queries: Map<string, IQueryDescriptor>;

    private _descriptor: IComponentDescriptor;

    public get properties(): ReadonlyArray<string> {
        return this._properties;
    }

    public get eventHandlers(): ReadonlyArray<EventHandlerDefinition> {
        return this._eventHandlers;
    }

    public get messageHandlers(): ReadonlyArray<IMessageHandlerDescriptor> {
        return this._messageHandlers;
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
        this._eventHandlers = [];
        this._messageHandlers = [];
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
        this._eventHandlers.push(new EventHandlerDefinition(event, selector, listener));
    }

    registerMessage<TMessage = any>(methodName: string, method: (m: TMessage) => void, messageType: ObjectType): void {
        this._messageHandlers.push({ methodName, method, messageType });
    }

    registerQuery(name: string, descriptor: IQueryDescriptor): void {
        this._queries.set(name, descriptor);
    }
}
