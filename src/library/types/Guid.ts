export class Guid {
    /**
     * Gets the guid value.
     */
    get value(): string {
        return this._value;
    }

    /**
     * Creates a new instance of type @see Guid
     * @param _value The guid value.
     */
    private constructor(private readonly _value: string) {}

    /**
     * Creates a new random string.
     */
    private static s4(): string {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    /**
     * Creates a new randomly generated guid.
     */
    static new(): Guid {
        return new Guid(
            (Guid.s4() + Guid.s4() + "-" + Guid.s4() + "-4" + Guid.s4().substr(0, 3) + "-" + Guid.s4() + "-" + Guid.s4() + Guid.s4() + Guid.s4()).toLowerCase()
        );
    }
}
