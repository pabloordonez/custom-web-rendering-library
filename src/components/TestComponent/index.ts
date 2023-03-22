import { Component, Property, EventHandler } from "library/decorators/components";
import { ComponentBase } from "library/components";
import { html } from "library/interpolation";
import styles from "./TestComponent.module.scss";

@Component({ selector: "test-component" })
export class TestComponent extends ComponentBase {
    @Property()
    name: string;

    @Property()
    age: number;

    constructor() {
        super();
    }

    @EventHandler(`.${styles.plus}`, "click")
    onPlusClick(): void {
        this.age++;
        this.invalidate();
    }

    @EventHandler(`.${styles.minus}`, "click")
    onMinusClick(): void {
        this.age--;
        this.invalidate();
    }

    protected render(): string {
        return html`<div class=${styles.container}>
            <h2>Test Component</h2>
            <div class=${styles.field}>
                <span>Name: </span>
                <span>${this.name}</span>
            </div>
            <div class=${styles.field}>
                <span>Age: </span>
                <span>${this.age}</span>
            </div>
            ${this.age >= 18 ? html`<span>Adult</span>` : html`<span>Minor</span>`}
            ${this.age > 0
                ? html`<div class=${styles.field}>
                      <button class=${styles.plus}>+</button>
                      <button class=${styles.minus}>-</button>
                  </div>`
                : html``}
        </div>`;
    }
}
