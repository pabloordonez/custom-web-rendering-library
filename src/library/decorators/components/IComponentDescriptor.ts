export interface IComponentDescriptor {
    tag: string;
    extends?: string;
    useParentDI?: boolean;
    useScopedDI?: boolean;
}
