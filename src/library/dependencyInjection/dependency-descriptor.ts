/*!
 * Paradigm Framework - Dependency Injection
 * Copyright (c) 2017 Miracle Devs, Inc
 * Licensed under MIT (https://github.com/MiracleDevs/Paradigm.Web.DI/blob/master/LICENSE)
 */
import { ObjectType } from "./object-type";
import { DependencyLifeTime } from "./dependency-life-time";

export class DependencyDescriptor<TInstance = any>
{
    constructor(
        public readonly lifeTime: DependencyLifeTime,
        public readonly dependencies: ObjectType[],
        public instance?: TInstance)
    {
    }
}
