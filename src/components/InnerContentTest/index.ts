import { Component, Query } from "library/decorators/components";
import { ComponentBase } from "library/components";
import { html } from "library/interpolation";
import styles from "./InnerContentTest.module.scss";

@Component({ tag: "inner-content-test" })
export class InnerContentTestComponent extends ComponentBase {

    private externalContent: string;

    @Query("#name")
    private nameElement: HTMLElement;

    @Query("#description")
    private descriptionElement: HTMLElement;

    constructor() {
        super();
        this.externalContent = this.innerHTML;
    }

    render(): string {
        return html`<div class="${styles.container}">${this.externalContent}</div>`;
    }

    protected afterRender(): void {
        if (this.nameElement) this.nameElement.style.color = "blue";
        if (this.descriptionElement) this.descriptionElement.style.color = "green";
    }
}
