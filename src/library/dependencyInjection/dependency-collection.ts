/*!
 * Paradigm Framework - Dependency Injection
 * Copyright (c) 2017 Miracle Devs, Inc
 * Licensed under MIT (https://github.com/MiracleDevs/Paradigm.Web.DI/blob/master/LICENSE)
 */
import { ObjectType, getObjectTypeName } from "./object-type";
import { DependencyLifeTime } from "./dependency-life-time";
import { DependencyDescriptor } from "./dependency-descriptor";
import { DependencyContainer } from "./dependency-container";

export class DependencyCollection
{
    private static _globalCollection: DependencyCollection;

    public static get globalCollection(): DependencyCollection
    {
        if (!this._globalCollection)
            this._globalCollection = new DependencyCollection();

        return this._globalCollection;
    }

    private readonly _registeredTypes: Map<ObjectType, DependencyDescriptor>;

    constructor()
    {
        this._registeredTypes = new Map<ObjectType, DependencyDescriptor>();
        this.register(DependencyContainer as any, DependencyLifeTime.Transient);
    }

    register<T = any>(objectType: ObjectType<T>, lifeTime: DependencyLifeTime, dependencies?: ObjectType[], instance?: T): void
    {
        if (this.contains(objectType))
            throw new Error(`The type ${getObjectTypeName(objectType)} is already registered.`);

        if (instance && lifeTime !== DependencyLifeTime.Singleton)
            throw new Error(`Only the singletons can be registered with an existing instance.`);

        this._registeredTypes.set(objectType, new DependencyDescriptor(lifeTime || DependencyLifeTime.Transient, dependencies || [], instance || null));
    }

    registerTransient<T = any>(objectType: ObjectType<T>, dependencies?: ObjectType[], ): void
    {
        this.register(objectType, DependencyLifeTime.Transient, dependencies);
    }

    registerScoped<T = any>(objectType: ObjectType<T>, dependencies?: ObjectType[], ): void
    {
        this.register(objectType, DependencyLifeTime.Scoped, dependencies);
    }

    registerSingleton<T = any>(objectType: ObjectType<T>, dependencies?: ObjectType[], instance?: T): void
    {
        this.register(objectType, DependencyLifeTime.Singleton, dependencies, instance);
    }

    get(objectType: ObjectType): DependencyDescriptor
    {
        if (!this._registeredTypes.has(objectType))
            throw new Error(`The type ${getObjectTypeName(objectType)} is not registered.`);

        return this._registeredTypes.get(objectType);
    }

    contains(objectType: ObjectType): boolean
    {
        return this._registeredTypes.has(objectType);
    }

    buildContainer(validate: boolean = false): DependencyContainer
    {
        if (validate)
        {
            let errors = '';

            for (const registeredType of this._registeredTypes.keys())
            {
                try
                {
                    this.validateCircularDependency(registeredType);
                    this.validateDependencyRegistration(registeredType);
                    this.validateScopedOnSingletons(registeredType);
                }
                catch (e)
                {
                    errors += ` - ${e.message}\n`;
                }
            }

            if (errors.length > 0)
            {
                throw new Error("Errors found on the dependency configuration:\n" + errors);
            }
        }

        return DependencyContainer.createFromCollection(this, "root");
    }

    private validateDependencyRegistration<T>(objectType: ObjectType<T>): void
    {
        const descriptor = this.get(objectType);

        for (const dependencyType of descriptor.dependencies)
        {
            if (!this.contains(dependencyType))
            {
                throw new Error(`The type '${getObjectTypeName(objectType)}' depends on the type '${getObjectTypeName(dependencyType)}' but is not registered.`);
            }

            this.validateDependencyRegistration(dependencyType);
        }
    }

    private validateCircularDependency<T>(objectType: ObjectType<T>, hierarchy?: ObjectType[]): void
    {
        if (!hierarchy)
            hierarchy = [];

        const descriptor = this.get(objectType);
        const dependencies = descriptor.dependencies;

        for (const dependencyType of dependencies)
        {
            if (!this.contains(dependencyType))
                continue;

            if (hierarchy.find(x => x === dependencyType))
            {
                throw new Error(`Circular dependency found in service type '${getObjectTypeName(hierarchy[0])}': ${hierarchy.map(x => getObjectTypeName(x)).join(" -> ")} -> ${getObjectTypeName(dependencyType)}.`);
            }

            const newHierarchy = [...hierarchy];
            newHierarchy.push(dependencyType);
            this.validateCircularDependency(dependencyType, newHierarchy);
        }
    }

    private validateScopedOnSingletons<T>(objectType: ObjectType<T>): void
    {
        const descriptor = this.get(objectType);

        for (const dependencyType of descriptor.dependencies)
        {
            const dependencyDescriptor = this.get(dependencyType);

            if (descriptor.lifeTime === DependencyLifeTime.Singleton &&
                dependencyDescriptor.lifeTime === DependencyLifeTime.Scoped)
            {
                throw new Error(`Cannot consume scoped type '${getObjectTypeName(dependencyType)}' from singleton '${getObjectTypeName(objectType)}'.`);
            }

            this.validateScopedOnSingletons(dependencyType);
        }
    }
}
