export interface IComponentDescriptor {
    selector: string;
    extends?: string;
    useParentDI?: boolean;
    useScopedDI?: boolean;
}
