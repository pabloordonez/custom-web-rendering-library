/*!
 * Paradigm Framework - Dependency Injection
 * Copyright (c) 2017 Miracle Devs, Inc
 * Licensed under MIT (https://github.com/MiracleDevs/Paradigm.Web.DI/blob/master/LICENSE)
 */
export type ObjectType<T = any> = new (...args: any[]) => T;

export function getObjectTypeName<T = any>(objectType: ObjectType<T> | Function | any): string {
    if (!objectType) return "null object";

    if (objectType.name) return objectType.name;

    if (objectType.constructor && objectType.constructor.name) return objectType.constructor.name;

    return "unknown type";
}
