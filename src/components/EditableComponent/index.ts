import { ComponentBase } from "library/components";
import { Component, EventHandler, Property, Query } from "library/decorators/components";
import { html } from "library/interpolation";
import styles from "./EditableComponent.module.scss";

@Component({ tag: "editable-component" })
export class EditableComponent extends ComponentBase {
	@Property()
    headerText: string;

	@Property()
    paragraphText: string;

	@Property("contentEditable")
	editable: boolean;

	@Query(`.${styles.container}`)
    private container: HTMLDivElement;

	@Query('h2')
    private header: HTMLHeadingElement;

	@Query('p')
    private paragraph: HTMLParagraphElement;

	constructor() {
        super();
    }

	@EventHandler('click', '#editButton')
	onClick(): void {
		this.editable = !this.editable;
		this.container.style.backgroundColor = this.editable ? `#${Math.floor(Math.random() * 16777215).toString(16)}` : '';

		if (!this.editable) {
			console.log(this.headerText);
			console.log(this.paragraphText);
		}
	}

	@EventHandler('input')
	onTextChange() {
		this.headerText = this.header.innerText;
		this.paragraphText = this.paragraph.innerText;
	}

	protected render(): string
	{
		return html`<div class="${styles.container}">
			<h2>${this.headerText}</h2>
			<p>${this.paragraphText}</p>
			<div>
                <button id="editButton">Edit content</button>
            </div>
		</div>`
	}
}