import { ComponentBase } from "../../../library/components/ComponentBase";
import { Component } from "../../../library/decorators/component/Component";
import html from "../../../library/interpolation/html";
import styles from "./TodoList.module.scss";

export class ToDoItem {
    constructor(public index: number, public message: string) {}
}

@Component({ selector: "todo-item" })
export class ToDoItemComponent extends ComponentBase {
    _item: ToDoItem;

    set item(value: ToDoItem) {
        this._item = value;
        this.invalidate();
    }

    get item(): ToDoItem {
        return this._item;
    }

    constructor() {
        super();
        this.initialize();
    }

    private initialize(): void {
        this.registerEvent("#message", "change", (e: InputEvent) => this.onValueChange(e));
        this.registerEvent("#removeButton", "click", () => this.onRemoveItemClick());
    }

    private onValueChange(e: InputEvent): void {
        this.item.message = (e.target as HTMLInputElement).value;
        console.log(this.item.message);
    }

    private onRemoveItemClick(): void {
        this.dispatchEvent(new CustomEvent<ToDoItemComponent>("onRemove", { bubbles: true, cancelable: false, detail: this }));
    }

    protected render(): string {
        if (!this.item) return "";
        return html`<div class="${styles.todoItem}">
            <span>${this.item.index}: </span>
            <input id="message" name="message[${this.item.index}]" value="${this.item.message}" />
            <button id="removeButton">Remove Item</button>
        </div>`;
    }
}
