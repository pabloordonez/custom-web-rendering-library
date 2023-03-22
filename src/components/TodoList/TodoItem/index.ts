import { ComponentBase } from "../../../library/components/ComponentBase";
import { Component } from "../../../library/decorators/component/Component";
import { EventHandler } from "../../../library/decorators/component/EventHandler";
import html from "../../../library/interpolation/html";
import styles from "./TodoList.module.scss";

export class ToDoItem {
    constructor(public index: number, public message: string) {}
}

@Component({ selector: "todo-item" })
export class ToDoItemComponent extends ComponentBase {
    private _item: ToDoItem;

    private readonly _event: CustomEvent<ToDoItemComponent>;

    set item(value: ToDoItem) {
        this._item = value;
        this.invalidate();
    }

    get item(): ToDoItem {
        return this._item;
    }

    constructor() {
        super();
        this._event = new CustomEvent<ToDoItemComponent>("onRemove", { bubbles: true, cancelable: false, detail: this });
    }

    @EventHandler(`.message`, "change")
    onValueChange(e: InputEvent): void {
        this.item.message = (e.currentTarget as HTMLInputElement).value;
    }

    @EventHandler(`#removeButton`, "click")
    onRemoveItemClick(): void {
        this.dispatchEvent(this._event);
    }

    protected render(): string {
        if (!this.item) return "";
        return html`<div class="${styles.todoItem}">
            <span>${this.item.index}: </span>
            <input class="message" id="message[${this.item.index}]" name="message[${this.item.index}]" value="${this.item.message}" />
            <button id="removeButton">Remove Item</button>
        </div>`;
    }
}
