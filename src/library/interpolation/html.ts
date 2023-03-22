export function html(strings: TemplateStringsArray, ...values: any[]): string {
    return String.raw({ raw: strings }, ...values);
}
