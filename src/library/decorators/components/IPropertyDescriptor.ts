export type PropertyTypeName = "number" | "string" | "boolean";

export type PropertyType = number | string | boolean;

export interface IPropertyDescriptor {
    name: string;
    type: PropertyTypeName;
    attribute?: string;
}


export function propertyToAttribute(name: string): string {
    return name.replace(/[A-Z]/g, x => `-${x.toLowerCase()}`);
}

export function attributeToProperty(name: string): string {
    return name.replace(/-[a-z]/g, x => x.substring(1).toUpperCase());
}
