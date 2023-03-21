import { ComponentBase } from "../../../library/components/ComponentBase";
import { Component } from "../../../library/decorators/component/Component";
import { Property } from "../../../library/decorators/property/Property";
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
    }

    private onValueChange(e: InputEvent): void {
        this.item.message = (e.target as HTMLInputElement).value;
        console.log(this.item.message);
    }

    protected render(): string {
        if (!this.item) return "";
        return html`<div class="${styles.todoItem}">
            <span>${this.item.index}: </span>
            <input id="message" name="message[${this.item.index}]" value="${this.item.message}" />
        </div>`;
    }
}
