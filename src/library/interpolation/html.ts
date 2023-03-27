export function html(strings: TemplateStringsArray, ...values: any[]): string {
    for (const index in values) {
        const value = values[index];

        if (Array.isArray(value)) {
            values[index] = value.join("");
        }
    }

    return String.raw({ raw: strings }, ...values);
}
