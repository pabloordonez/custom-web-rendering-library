import { Component } from "../../library/decorators/component/Component";
import { Property } from "../../library/decorators/property/Property";
import { ComponentBase } from "../../library/components/ComponentBase";
import html from "../../library/interpolation/html";
import styles from "./TestComponent.module.scss";

@Component({ selector: "test-component" })
export class TestComponent extends ComponentBase {
    @Property()
    name: string;

    @Property()
    age: number;

    constructor() {
        super();
        this.initialize();
    }

    private initialize(): void {
        this.registerEvent(`.${styles.plus}`, "click", e => {
            this.age++;
            this.invalidate();
        });

        this.registerEvent(`.${styles.minus}`, "click", e => {
            this.age--;
            this.invalidate();
        });
    }

    protected render(): string {
        console.log("re-render");
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
