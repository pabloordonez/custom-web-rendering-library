import { ComponentBase } from "library/components";
import { Component, EventHandler } from "library/decorators/components";
import { html } from "library/interpolation";
import { ToDoItem, ToDoItemComponent } from "./TodoItem";
import styles from "./TodoList.module.scss";
export { ToDoItemComponent } from "./TodoItem";

@Component({ selector: "todo-list" })
export class ToDoListComponent extends ComponentBase {
    private readonly items: ToDoItem[];

    constructor() {
        super();
        this.items = [];
    }

    @EventHandler(`#addButton`, "click")
    onAddItemClick(): void {
        this.items.push(new ToDoItem(this.items.length + 1, ""));
        this.invalidate();
    }

    @EventHandler(`todo-item`, "onRemove")
    onRemoveItem(e: CustomEvent<ToDoItemComponent>): void {
        const item = e.detail;
        this.items.splice(this.items.indexOf(item.item), 1);
        this.items.forEach((x, i) => (x.index = i + 1));
        this.invalidate();
    }

    protected render(): string {
        return html`<div class="${styles.container}">
            <h2>TODO List (${this.items.length})</h2>
            <div class="${styles.items}">${this.items.map((x, i) => html`<todo-item ref="${x.index}"></todo-item>`)}</div>
            <div>
                <button id="addButton">Add Item</button>
            </div>
        </div>`;
    }

    protected afterRender(): void {
        for (const item of this.items) {
            (this.refs[item.index] as ToDoItemComponent).item = item;
        }
    }
}
