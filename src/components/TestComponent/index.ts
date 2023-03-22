import { Component } from "../../library/decorators/component/Component";
import { Property } from "../../library/decorators/component/Property";
import { ComponentBase } from "../../library/components/ComponentBase";
import html from "../../library/interpolation/html";
import styles from "./TestComponent.module.scss";
import { EventHandler } from "../../library/decorators/component/EventHandler";

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
            <h1>Test Component</h1>
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
