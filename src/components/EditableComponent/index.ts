import { ComponentBase } from "library/components";
import { Component, EventHandler, Property, Query } from "library/decorators/components";
import { html } from "library/interpolation";
import styles from "./EditableComponent.module.scss";

@Component({ tag: "editable-component" })
export class EditableComponent extends ComponentBase {
	@Property()
    headertext: string;

	@Property()
    paragraphtext: string;

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
		const editable = !JSON.parse(this.getAttribute('contentEditable'));
		this.setAttribute('contentEditable', editable.toString());
		this.container.style.backgroundColor = editable ? `#${Math.floor(Math.random() * 16777215).toString(16)}` : '';

		if (!editable) {
			console.log(this.headertext);
			console.log(this.paragraphtext);
		}
	}

	@EventHandler('input')
	onTextChange() {
		this.headertext = this.header.innerText;
		this.paragraphtext = this.paragraph.innerText;
	}

	protected render(): string
	{
		return html`<div class="${styles.container}">
			<h2>${this.headertext}</h2>
			<p>${this.paragraphtext}</p>
			<div>
                <button id="editButton">Edit content</button>
            </div>
		</div>`
	}
}