import { Component, Property, EventHandler, Query } from "library/decorators/components";
import { ComponentBase } from "library/components";
import { html } from "library/interpolation";
import styles from "./TestComponent.module.scss";
import { TestService } from "library/services/TestService";

@Component({ tag: "test-component" })
export class TestComponent extends ComponentBase {
    @Property()
    name: string;

    @Property()
    age: number;

    @Query(`.${styles.container}`)
    private container: HTMLDivElement;

    constructor() {
        super();
        this.dependencyContainer.resolve(TestService).test();
    }

    @EventHandler("click")
    onClick(): void {
        if (!this.container) return;
        this.container.style.backgroundColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
    }

    @EventHandler("click", `.${styles.plus}`)
    onPlusClick(): void {
        this.age++;
        this.invalidate();
    }

    @EventHandler("click", `.${styles.minus}`)
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
