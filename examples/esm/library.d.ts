declare module 'my-webpack-project/components/InnerContentTest/index' {
  import { ComponentBase } from "library/components";
  export class InnerContentTestComponent extends ComponentBase {
      private externalContent;
      private nameElement;
      private descriptionElement;
      constructor();
      render(): string;
      protected afterRender(): void;
  }

}
declare module 'my-webpack-project/components/PerformantTodoList/index' {
  import { ToDoItemComponent } from "components/TodoList/TodoItem";
  import { ComponentBase } from "library/components";
  export class PerformantToDoListComponent extends ComponentBase {
      private readonly itemViews;
      private readonly counter;
      constructor();
      onAddItemClick(): void;
      onRemoveItem(e: CustomEvent<ToDoItemComponent>): void;
      private updateCounter;
      protected render(): string;
  }

}
declare module 'my-webpack-project/components/TestComponent/index' {
  import { ComponentBase } from "library/components";
  export class TestComponent extends ComponentBase {
      name: string;
      age: number;
      private container;
      constructor();
      onClick(): void;
      onPlusClick(): void;
      onMinusClick(): void;
      protected render(): string;
  }

}
declare module 'my-webpack-project/components/TodoList/index' {
  import { ComponentBase } from "library/components";
  import { ToDoItemComponent } from "my-webpack-project/components/TodoList/TodoItem/index";
  export { ToDoItemComponent } from "my-webpack-project/components/TodoList/TodoItem/index";
  export class ToDoListComponent extends ComponentBase {
      private readonly items;
      private readonly itemViews;
      constructor();
      onAddItemClick(): void;
      onRemoveItem(e: CustomEvent<ToDoItemComponent>): void;
      protected render(): string;
      protected afterRender(): void;
  }

}
declare module 'my-webpack-project/components/TodoList/TodoItem/index' {
  import { ComponentBase } from "library/components";
  export class ToDoItem {
      index: number;
      message: string;
      constructor(index: number, message: string);
  }
  export class ToDoItemComponent extends ComponentBase {
      private _item?;
      private readonly _event;
      set item(value: ToDoItem);
      get item(): ToDoItem | undefined;
      constructor();
      onValueChange(e: InputEvent): void;
      onRemoveItemClick(): void;
      protected render(): string;
  }

}
declare module 'my-webpack-project/index' {
  export * from "components/TestComponent";
  export * from "components/TodoList";
  export * from "components/PerformantTodoList";
  export * from "components/InnerContentTest";

}
declare module 'my-webpack-project/library/components/ComponentBase' {
  import { DependencyContainer } from "library/dependencyInjection";
  import { ComponentType } from "my-webpack-project/library/decorators/components/index";
  export class ComponentBase extends HTMLElement {
      private readonly _componentType;
      private readonly _dependencyContainer;
      private readonly _eventListenerInstances;
      protected get dependencyContainer(): DependencyContainer;
      protected get componentType(): ComponentType;
      constructor();
      connectedCallback(): void;
      disconnectedCallback(): void;
      invalidate(reRender?: boolean): void;
      protected attributeChangedCallback(name: string, oldValue: any, newValue: any): void;
      protected onCreated(): void;
      protected onRemoved(): void;
      protected beforeRender(): void;
      protected render(): string;
      protected afterRender(): void;
      private getDependencyContainer;
      private executeQueries;
      private connectEvents;
      private disconnectEvents;
  }

}
declare module 'my-webpack-project/library/components/index' {
  export * from "my-webpack-project/library/components/ComponentBase";

}
declare module 'my-webpack-project/library/decorators/components/Component' {
  import { IComponentDescriptor } from "my-webpack-project/library/decorators/components/IComponentDescriptor";
  import { ObjectType } from "my-webpack-project/library/dependencyInjection/index";
  export function Component(descriptor: IComponentDescriptor): <T>(controller: ObjectType<T>) => void;

}
declare module 'my-webpack-project/library/decorators/components/ComponentType' {
  import { EventDefinition, EventName } from "my-webpack-project/library/decorators/components/EventDefinition";
  import { ObjectType } from "my-webpack-project/library/dependencyInjection/index";
  import { IComponentDescriptor } from "my-webpack-project/library/decorators/components/IComponentDescriptor";
  import { IQueryDescriptor } from "my-webpack-project/library/decorators/components/IQueryDescriptor";
  export class ComponentType {
      readonly type: ObjectType;
      private _properties;
      private _events;
      private _queries;
      private _descriptor;
      get properties(): ReadonlyArray<string>;
      get events(): ReadonlyArray<EventDefinition>;
      get queries(): ReadonlyMap<string, IQueryDescriptor>;
      get descriptor(): Readonly<IComponentDescriptor>;
      readonly name: string;
      constructor(type: ObjectType);
      registerDescriptor(descriptor: IComponentDescriptor): void;
      registerProperty(property: string): void;
      registerEvent(event: EventName | string, selector: string, listener: EventListener): void;
      registerQuery(name: string, descriptor: IQueryDescriptor): void;
  }

}
declare module 'my-webpack-project/library/decorators/components/ComponentTypeCollection' {
  import { ObjectType } from "my-webpack-project/library/dependencyInjection/index";
  import { ComponentType } from "my-webpack-project/library/decorators/components/ComponentType";
  export class ComponentTypeCollection {
      private static _globalInstance;
      static get globalInstance(): ComponentTypeCollection;
      private readonly _registeredTypes;
      private constructor();
      get(component: ObjectType): ComponentType;
      contains(component: ObjectType): boolean;
      getComponents(): IterableIterator<ComponentType>;
      defineAll(): void;
  }

}
declare module 'my-webpack-project/library/decorators/components/DecoratorResult' {
  export type DecoratorResult = (target: any, propertyKey: string) => void;

}
declare module 'my-webpack-project/library/decorators/components/EventDefinition' {
  import { EventListenerInstance } from "my-webpack-project/library/decorators/components/EventListenerInstance";
  export type EventName = keyof HTMLElementEventMap;
  export class EventDefinition {
      readonly event: EventName | string;
      readonly selector: string;
      readonly func: EventListener;
      constructor(event: EventName | string, selector: string, func: EventListener);
      connect(element: HTMLElement): EventListenerInstance[];
  }

}
declare module 'my-webpack-project/library/decorators/components/EventHandler' {
  import { EventName } from "my-webpack-project/library/decorators/components/EventDefinition";
  export function EventHandler(event: EventName | string, selector?: string): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;

}
declare module 'my-webpack-project/library/decorators/components/EventListenerInstance' {
  import { EventName } from "my-webpack-project/library/decorators/components/EventDefinition";
  export class EventListenerInstance {
      readonly element: Element;
      readonly event: EventName | string;
      readonly func: EventListener;
      constructor(element: Element, event: EventName | string, func: EventListener);
      disconnect(): void;
  }

}
declare module 'my-webpack-project/library/decorators/components/IComponentDescriptor' {
  export interface IComponentDescriptor {
      tag: string;
      extends?: string;
      useParentDI?: boolean;
      useScopedDI?: boolean;
  }

}
declare module 'my-webpack-project/library/decorators/components/index' {
  export * from "my-webpack-project/library/decorators/components/Component";
  export * from "my-webpack-project/library/decorators/components/ComponentType";
  export * from "my-webpack-project/library/decorators/components/ComponentTypeCollection";
  export * from "my-webpack-project/library/decorators/components/DecoratorResult";
  export * from "my-webpack-project/library/decorators/components/EventDefinition";
  export * from "my-webpack-project/library/decorators/components/EventHandler";
  export * from "my-webpack-project/library/decorators/components/EventListenerInstance";
  export * from "my-webpack-project/library/decorators/components/IComponentDescriptor";
  export * from "my-webpack-project/library/decorators/components/Property";
  export * from "my-webpack-project/library/decorators/components/Query";

}
declare module 'my-webpack-project/library/decorators/components/IQueryDescriptor' {
  export interface IQueryDescriptor {
      selector: string;
      multiple?: boolean;
  }

}
declare module 'my-webpack-project/library/decorators/components/Property' {
  import { DecoratorResult } from "my-webpack-project/library/decorators/components/DecoratorResult";
  export function Property(): DecoratorResult;

}
declare module 'my-webpack-project/library/decorators/components/Query' {
  import { DecoratorResult } from "my-webpack-project/library/decorators/components/DecoratorResult";
  export function Query(selector: string, multiple?: boolean): DecoratorResult;

}
declare module 'my-webpack-project/library/dependencyInjection/dependency-collection' {
  /*!
   * Paradigm Framework - Dependency Injection
   * Copyright (c) 2017 Miracle Devs, Inc
   * Licensed under MIT (https://github.com/MiracleDevs/Paradigm.Web.DI/blob/master/LICENSE)
   */
  import { ObjectType } from "my-webpack-project/library/dependencyInjection/object-type";
  import { DependencyLifeTime } from "my-webpack-project/library/dependencyInjection/dependency-life-time";
  import { DependencyDescriptor } from "my-webpack-project/library/dependencyInjection/dependency-descriptor";
  import { DependencyContainer } from "my-webpack-project/library/dependencyInjection/dependency-container";
  export class DependencyCollection {
      private static _globalCollection;
      static get globalCollection(): DependencyCollection;
      private readonly _registeredTypes;
      constructor();
      register<T = any>(objectType: ObjectType<T>, lifeTime: DependencyLifeTime, dependencies?: ObjectType[], instance?: T): void;
      registerTransient<T = any>(objectType: ObjectType<T>, dependencies?: ObjectType[]): void;
      registerScoped<T = any>(objectType: ObjectType<T>, dependencies?: ObjectType[]): void;
      registerSingleton<T = any>(objectType: ObjectType<T>, dependencies?: ObjectType[], instance?: T): void;
      get(objectType: ObjectType): DependencyDescriptor;
      contains(objectType: ObjectType): boolean;
      buildContainer(validate?: boolean): DependencyContainer;
      private validateDependencyRegistration;
      private validateCircularDependency;
      private validateScopedOnSingletons;
  }

}
declare module 'my-webpack-project/library/dependencyInjection/dependency-container' {
  /*!
   * Paradigm Framework - Dependency Injection
   * Copyright (c) 2017 Miracle Devs, Inc
   * Licensed under MIT (https://github.com/MiracleDevs/Paradigm.Web.DI/blob/master/LICENSE)
   */
  import "reflect-metadata";
  import { ObjectType } from "my-webpack-project/library/dependencyInjection/object-type";
  import { DependencyCollection } from "my-webpack-project/library/dependencyInjection/dependency-collection";
  export class DependencyContainer {
      private _scopedInstances;
      private _collection;
      private _parent;
      readonly name: string;
      private constructor();
      static createFromCollection(collection: DependencyCollection, name?: string): DependencyContainer;
      createScopedInjector(name?: string): DependencyContainer;
      resolve<T = any>(objectType: ObjectType<T>): T;
      private createInstance;
      private getInstance;
  }

}
declare module 'my-webpack-project/library/dependencyInjection/dependency-descriptor' {
  /*!
   * Paradigm Framework - Dependency Injection
   * Copyright (c) 2017 Miracle Devs, Inc
   * Licensed under MIT (https://github.com/MiracleDevs/Paradigm.Web.DI/blob/master/LICENSE)
   */
  import { ObjectType } from "my-webpack-project/library/dependencyInjection/object-type";
  import { DependencyLifeTime } from "my-webpack-project/library/dependencyInjection/dependency-life-time";
  export class DependencyDescriptor<TInstance = any> {
      readonly lifeTime: DependencyLifeTime;
      readonly dependencies: ObjectType[];
      instance?: TInstance;
      constructor(lifeTime: DependencyLifeTime, dependencies: ObjectType[], instance?: TInstance);
  }

}
declare module 'my-webpack-project/library/dependencyInjection/dependency-life-time' {
  /*!
   * Paradigm Framework - Dependency Injection
   * Copyright (c) 2017 Miracle Devs, Inc
   * Licensed under MIT (https://github.com/MiracleDevs/Paradigm.Web.DI/blob/master/LICENSE)
   */
  export enum DependencyLifeTime {
      Transient = 0,
      Scoped = 1,
      Singleton = 2
  }

}
declare module 'my-webpack-project/library/dependencyInjection/index' {
  /*!
   * Paradigm Framework - Dependency Injection
   * Copyright (c) 2017 Miracle Devs, Inc
   * Licensed under MIT (https://github.com/MiracleDevs/Paradigm.Web.DI/blob/master/LICENSE)
   */
  export * from "my-webpack-project/library/dependencyInjection/object-type";
  export * from "my-webpack-project/library/dependencyInjection/dependency-collection";
  export * from "my-webpack-project/library/dependencyInjection/dependency-container";
  export * from "my-webpack-project/library/dependencyInjection/dependency-descriptor";
  export * from "my-webpack-project/library/dependencyInjection/dependency-life-time";
  export * from "my-webpack-project/library/dependencyInjection/injectable";

}
declare module 'my-webpack-project/library/dependencyInjection/injectable' {
  /*!
   * Paradigm Framework - Dependency Injection
   * Copyright (c) 2017 Miracle Devs, Inc
   * Licensed under MIT (https://github.com/MiracleDevs/Paradigm.Web.DI/blob/master/LICENSE)
   */
  import { ObjectType } from "my-webpack-project/library/dependencyInjection/object-type";
  import { DependencyLifeTime } from "my-webpack-project/library/dependencyInjection/dependency-life-time";
  import { DependencyCollection } from "my-webpack-project/library/dependencyInjection/dependency-collection";
  import "reflect-metadata";
  export interface IInjectableDescriptor {
      lifeTime?: DependencyLifeTime;
      collection?: DependencyCollection;
  }
  export function Injectable(descriptor?: IInjectableDescriptor): <T>(component: ObjectType<T>) => void;

}
declare module 'my-webpack-project/library/dependencyInjection/object-type' {
  /*!
   * Paradigm Framework - Dependency Injection
   * Copyright (c) 2017 Miracle Devs, Inc
   * Licensed under MIT (https://github.com/MiracleDevs/Paradigm.Web.DI/blob/master/LICENSE)
   */
  export type ObjectType<T = any> = new (...args: any[]) => T;
  export function getObjectTypeName<T = any>(objectType: ObjectType<T> | Function | any): string;

}
declare module 'my-webpack-project/library/interpolation/html' {
  export function html(strings: TemplateStringsArray, ...values: any[]): string;

}
declare module 'my-webpack-project/library/interpolation/index' {
  export * from "my-webpack-project/library/interpolation/html";

}
declare module 'my-webpack-project/library/services/logging/LoggingService' {
  import ILogProvider from "my-webpack-project/library/services/logging/providers/ILogProvider";
  export enum LogType {
      Trace = 0,
      Debug = 1,
      Info = 2,
      Warning = 3,
      Error = 4
  }
  export default class LoggingService implements ILogProvider {
      private minimumLogLevel;
      private provider;
      constructor();
      /**
       * Set the log provider.
       * @param provider the log provider.
       */
      setLogProvider(provider: ILogProvider): void;
      /**
       * Returns the log provider.
       * @returns Returns a derived @see LogProvider
       */
      getLogProvider(): ILogProvider;
      /**
       * Set the minimum log level.
       * @param type the type of log.
       */
      setMinimumLevel(type: LogType): void;
      /**
       * Adds a trace log.
       * @param message the message to be logged.
       * @param [optionalParams = null] the optional parameters array.
       */
      trace(message: string, optionalParams?: Array<any>): void;
      /**
       * Adds a debug log.
       * @param message the message to be logged.
       * @param [optionalParams = null] the optional parameters array.
       */
      log(message: string, optionalParams?: Array<any>): void;
      /**
       * Adds an information log.
       * @param message the message to be logged.
       * @param [optionalParams = null] the optional parameters array.
       */
      info(message: string, optionalParams?: Array<any>): void;
      /**
       * Adds a warning log.
       * @param message the message to be logged.
       * @param [optionalParams = null] the optional parameters array.
       */
      warn(message: string, optionalParams?: Array<any>): void;
      /**
       * Adds an error log.
       * @param message the message to be logged.
       * @param [optionalParams = null] the optional parameters array.
       */
      error(message: string, optionalParams?: Array<any>): void;
      /**
       * Adds an exception error to the logs.
       * @param error Error to be added.
       */
      exception(error: any): void;
      /**
       * Writes the log.
       * @param type the type of log.
       * @param message the message to be logged.
       * @param [optionalParams = null] the optional parameters array.
       */
      writeLog(type: LogType, message: string, optionalParams?: Array<any>): void;
  }

}
declare module 'my-webpack-project/library/services/logging/providers/ConsoleLogProvider' {
  import ILogProvider from "my-webpack-project/library/services/logging/providers/ILogProvider";
  export default class LogProvider implements ILogProvider {
      /**
       * Adds a trace log.
       * @param message the message to be logged.
       * @param [optionalParams = null] the optional parameters array.
       */
      trace(message: string, optionalParams?: Array<any>): void;
      /**
       * Adds a debug log.
       * @param message the message to be logged.
       * @param [optionalParams = null] the optional parameters array.
       */
      log(message: string, optionalParams?: Array<any>): void;
      /**
       * Adds an information log.
       * @param message the message to be logged.
       * @param [optionalParams = null] the optional parameters array.
       */
      info(message: string, optionalParams?: Array<any>): void;
      /**
       * Adds a warning log.
       * @param message the message to be logged.
       * @param [optionalParams = null] the optional parameters array.
       */
      warn(message: string, optionalParams?: Array<any>): void;
      /**
       * Adds an error log.
       * @param message the message to be logged.
       * @param [optionalParams = null] the optional parameters array.
       */
      error(message: string, optionalParams?: Array<any>): void;
  }

}
declare module 'my-webpack-project/library/services/logging/providers/ILogProvider' {
  export default interface ILogProvider {
      /**
       * Adds a trace log.
       * @param message the message to be logged.
       * @param [optionalParams = null] the optional parameters array.
       */
      trace(message: string, optionalParams?: Array<any>): void;
      /**
       * Adds a debug log.
       * @param message the message to be logged.
       * @param [optionalParams = null] the optional parameters array.
       */
      log(message: string, optionalParams?: Array<any>): void;
      /**
       * Adds an information log.
       * @param message the message to be logged.
       * @param [optionalParams = null] the optional parameters array.
       */
      info(message: string, optionalParams?: Array<any>): void;
      /**
       * Adds a warning log.
       * @param message the message to be logged.
       * @param [optionalParams = null] the optional parameters array.
       */
      warn(message: string, optionalParams?: Array<any>): void;
      /**
       * Adds an error log.
       * @param message the message to be logged.
       * @param [optionalParams = null] the optional parameters array.
       */
      error(message: string, optionalParams?: Array<any>): void;
  }

}
declare module 'my-webpack-project/library/services/logging/providers/InMemoryLogProvider' {
  import { LogType } from "my-webpack-project/library/services/logging/LoggingService";
  import ILogProvider from "my-webpack-project/library/services/logging/providers/ILogProvider";
  interface ILogEntry {
      type: LogType;
      message: string;
      optionalParams?: any[];
  }
  export default class InMemoryLogProvider implements ILogProvider {
      logs: ILogEntry[];
      constructor();
      /**
       * Adds a trace log.
       * @param message the message to be logged.
       * @param [optionalParams = null] the optional parameters array.
       */
      trace(message: string, optionalParams?: Array<any>): void;
      /**
       * Adds a debug log.
       * @param message the message to be logged.
       * @param [optionalParams = null] the optional parameters array.
       */
      log(message: string, optionalParams?: Array<any>): void;
      /**
       * Adds an information log.
       * @param message the message to be logged.
       * @param [optionalParams = null] the optional parameters array.
       */
      info(message: string, optionalParams?: Array<any>): void;
      /**
       * Adds a warning log.
       * @param message the message to be logged.
       * @param [optionalParams = null] the optional parameters array.
       */
      warn(message: string, optionalParams?: Array<any>): void;
      /**
       * Adds an error log.
       * @param message the message to be logged.
       * @param [optionalParams = null] the optional parameters array.
       */
      error(message: string, optionalParams?: Array<any>): void;
      /**
       * Registers the log entry.
       * @param type the type of log.
       * @param message the message to be logged.
       * @param [optionalParams = null] the optional parameters array.
       */
      registerLog(type: LogType, message: string, optionalParams?: Array<any>): void;
  }
  export {};

}
declare module 'my-webpack-project/library/services/messaging/MessageBus' {
  import { MessageHandler } from "my-webpack-project/library/services/messaging/MessageHandler";
  import { RegistrationToken } from "my-webpack-project/library/services/messaging/RegistrationToken";
  import { ObjectType } from "library/dependencyInjection";
  export class MessageBusService {
      /**
       * A collection of message types and all their handlers or observers.
       */
      private handlers;
      /**
       * Creates a new instance of @see MessageBusService
       */
      constructor();
      /**
       * Gets the amount of messages registered.
       */
      count(): number;
      /**
       * Indicates if the given message type is registered and has handlers associated to it.
       * @param messageType the message type.
       */
      isRegistered<T>(messageType: ObjectType<T>): boolean;
      /**
       * Gets the amount of handler or observers a given message has.
       * @param messageType the message type.
       */
      handlerCount<T>(messageType: ObjectType<T>): number;
      /**
       * Registers a new message handler.
       * The handler will be called every time a message of @see messageType is called.
       * @param messageType the message type.
       * @param handler the message handler.
       */
      register<T>(messageType: ObjectType<T>, handler: MessageHandler<T>): RegistrationToken<T>;
      /**
       * Removes a handler registration from the collection.
       * @param token the registration token.
       */
      unregister<T>(token: RegistrationToken<T>): void;
      /**
       * Unregisters all the message handlers.
       */
      unregisterAll(): void;
      /**
       * Sends a message to all the registered handlers.
       * @param message the message to be sent.
       * @param token if specified, the message will be sent only to one handler.
       */
      send<T>(message: T, token?: RegistrationToken<T>): Promise<void>;
  }

}
declare module 'my-webpack-project/library/services/messaging/MessageBusHandler' {
  import { MessageHandler } from "my-webpack-project/library/services/messaging/MessageHandler";
  import { RegistrationToken } from "my-webpack-project/library/services/messaging/RegistrationToken";
  import { MessageBusService } from "my-webpack-project/library/services/messaging/MessageBus";
  import { ObjectType } from "library/dependencyInjection";
  /**
   * Represents a message bus callback handler.
   * It holds a method that must be called when certain
   * message is received.
   */
  export class MessageBusHandler<T = any> {
      /**
       * The registration token that identifies this handler.
       */
      private innerToken;
      /**
       * The handler or function that should be called when the message is received.
       */
      private innerHandler;
      /**
       * Gets the registration token that identifies this handler.
       */
      get token(): RegistrationToken<T>;
      /**
       * Gets the handler function that should be called when the message is received.
       */
      get handler(): MessageHandler<T>;
      /**
       * Creates a new instance of @see MessageBusHandler
       * @param messageBus a reference to the message bus.
       * @param type the message type.
       * @param handler the message handler.
       */
      constructor(messageBus: MessageBusService, type: ObjectType<T>, handler: MessageHandler<T>);
  }

}
declare module 'my-webpack-project/library/services/messaging/MessageHandler' {
  /**
   * Represents a message bus event handler.
   */
  export type MessageHandler<T = any> = (message: T) => void | Promise<void>;

}
declare module 'my-webpack-project/library/services/messaging/RegistrationToken' {
  import { ObjectType } from "library/dependencyInjection";
  import { Guid } from "library/types/Guid";
  import { MessageBusService } from "my-webpack-project/library/services/messaging/MessageBus";
  /**
   * Represents a message bus registration token.
   */
  export class RegistrationToken<T = any> {
      /**
       * A reference to the @see MessageBusService.
       */
      private messageBus;
      /**
       * The inner message type.
       */
      private innerType;
      /**
       * A guid identifying this registration.
       */
      private innerGuid;
      /**
       * Gets the message type.
       */
      get type(): ObjectType<T>;
      /**
       * Gets the registration guid.
       */
      get guid(): Guid;
      /**
       * Creates a new instance of @see RegistrationToken
       * @param messageBus a reference to the message bus.
       * @param type the message type.
       */
      constructor(messageBus: MessageBusService, type: ObjectType<T>);
      /**
       * Removes the callback from the message bus.
       */
      unregister(): void;
  }

}
declare module 'my-webpack-project/library/types/Guid' {
  export class Guid {
      private readonly _value;
      /**
       * Gets the guid value.
       */
      get value(): string;
      /**
       * Creates a new instance of type @see Guid
       * @param _value The guid value.
       */
      private constructor();
      /**
       * Creates a new random string.
       */
      private static s4;
      /**
       * Creates a new randomly generated guid.
       */
      static new(): Guid;
  }

}
declare module 'my-webpack-project' {
  import main = require('my-webpack-project/src/index');
  export = main;
}