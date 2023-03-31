import { EventHandlerDefinition, EventName } from "./EventHandlerDefinition";
import { ObjectType, getObjectTypeName } from "../../dependencyInjection";
import { IComponentDescriptor } from "./IComponentDescriptor";
import { IQueryDescriptor } from "./IQueryDescriptor";
import { IMessageHandlerDescriptor } from "./IMessageHandlerDescriptor";
import { IPropertyDescriptor, PropertyTypeName } from "./IPropertyDescriptor";

export class ComponentType {
    private _properties: Map<string, IPropertyDescriptor>;

    private _eventHandlers: EventHandlerDefinition[];

    private _messageHandlers: IMessageHandlerDescriptor[];

    private _queries: Map<string, IQueryDescriptor>;

    private _descriptor: IComponentDescriptor;

    public get properties(): ReadonlyMap<string, IPropertyDescriptor> {
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
        this._eventHandlers = [];
        this._messageHandlers = [];
        this._properties = new Map<string, IPropertyDescriptor>();
        this._queries = new Map<string, IQueryDescriptor>();
        this._descriptor = { tag: "", renderOnAttributeChange: true };
        this.name = getObjectTypeName(type);
        this.type = type;
    }

    registerDescriptor(descriptor: IComponentDescriptor): void {
        this._descriptor = descriptor;
    }

    registerProperty(name: string, type: PropertyTypeName,  attribute?: string): void {
        this._properties.set(name, { name, type, attribute });
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

    findPropertyByAttribute(attribute: string): IPropertyDescriptor {
        for (const propertyDescriptor of this._properties.values()) {
            if (propertyDescriptor.attribute === attribute) return propertyDescriptor;
        }

        return undefined;
    }
}
