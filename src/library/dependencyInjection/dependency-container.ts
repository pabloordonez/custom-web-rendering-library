/*!
 * Paradigm Framework - Dependency Injection
 * Copyright (c) 2017 Miracle Devs, Inc
 * Licensed under MIT (https://github.com/MiracleDevs/Paradigm.Web.DI/blob/master/LICENSE)
 */
import "reflect-metadata";
import { ObjectType, getObjectTypeName } from "./object-type";
import { DependencyLifeTime } from "./dependency-life-time";
import { DependencyDescriptor } from "./dependency-descriptor";
import { DependencyCollection } from "./dependency-collection";

export class DependencyContainer {
    private _scopedInstances: Map<ObjectType, any>;

    private _collection: DependencyCollection;

    private _parent: DependencyContainer;

    public readonly name: string;

    private constructor(parent: DependencyContainer, collection: DependencyCollection, name: string) {
        this._scopedInstances = new Map<ObjectType, any>();
        this._collection = collection;
        this._parent = parent;
        this.name = name;
    }

    public static createFromCollection(collection: DependencyCollection, name?: string) {
        if (!collection) throw new Error("Can not create a dependency container without a dependency collection.");

        return new DependencyContainer(null, collection, name);
    }

    createScopedInjector(name?: string): DependencyContainer {
        return new DependencyContainer(this, this._collection, name);
    }

    resolve<T = any>(objectType: ObjectType<T>): T {
        try {
            if ((objectType as any) === DependencyContainer) return this as any;

            // this will throw if the object type is not registered.
            const descriptor = this._collection.get(objectType);

            switch (descriptor.lifeTime) {
                //////////////////////////////////////////////////////////////
                // Singletons
                //////////////////////////////////////////////////////////////
                // if the descriptor tells is a singleton we try to create
                // the instance or we return the instance we have.
                case DependencyLifeTime.Singleton:
                    if (!descriptor.instance) descriptor.instance = this.createInstance(objectType, descriptor);

                    return descriptor.instance;

                //////////////////////////////////////////////////////////////
                // Scoped
                //////////////////////////////////////////////////////////////
                // the scoped instances are scoped singletons, singletons that
                // live the scoped injector instead of the global scope
                case DependencyLifeTime.Scoped:
                    if (this._parent === null) throw new Error("Can not instantiate a scoped type in the global container.");

                    const instance = this.getInstance(objectType);

                    if (!instance) {
                        this._scopedInstances.set(objectType, this.createInstance(objectType, descriptor));
                        return this._scopedInstances.get(objectType);
                    }

                    return instance;

                //////////////////////////////////////////////////////////////
                // Transient
                //////////////////////////////////////////////////////////////
                case DependencyLifeTime.Transient:
                    return this.createInstance(objectType, descriptor);

                default:
                    throw new Error(`Life time parameter not recognized as a valid life time.`);
            }
        } catch (e) {
            throw new Error(`Couldn't instantiate the type ${getObjectTypeName(objectType)}.\n - ${e.message}`);
        }
    }

    private createInstance<T>(objectType: ObjectType<T>, descriptor: DependencyDescriptor): T {
        const parameters = [null].concat(descriptor.dependencies.map(x => this.resolve(x)));
        return new (Function.prototype.bind.apply(objectType, parameters))();
    }

    private getInstance<T>(objectType: ObjectType<T>): T {
        if (this._scopedInstances.has(objectType)) return this._scopedInstances.get(objectType);

        if (this._parent) return this._parent.getInstance(objectType);

        return null;
    }
}
