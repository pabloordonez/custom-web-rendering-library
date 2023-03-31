export interface IComponentDescriptor {
    tag: string;
    extends?: string;
    renderOnAttributeChange?: boolean;
    autoProperties?: boolean;
    useParentDI?: boolean;
    useScopedDI?: boolean;
}
