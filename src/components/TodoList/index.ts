import { ComponentBase } from "../../library/components/ComponentBase";
import { Component } from "../../library/decorators/component/Component";
import html from "../../library/interpolation/html";
import { ToDoItem, ToDoItemComponent } from "./TodoItem";
import styles from "./TodoList.module.scss";
export { ToDoItemComponent } from "./TodoItem";

@Component({ selector: "todo-list" })
export class ToDoListComponent extends ComponentBase {
    private items: ToDoItem[];

    constructor() {
        super();
        this.initialize();
    }

    private initialize(): void {
        this.items = [];
        this.registerEvent("#addButton", "click", () => this.onAddItemClick());
        this.registerEvent("todo-item", "onRemove", (e: CustomEvent<ToDoItemComponent>) => this.onRemoveItem(e.detail));
    }

    private onAddItemClick(): void {
        this.items.push(new ToDoItem(this.items.length + 1, ""));
        this.invalidate();
    }

    private onRemoveItem(item: ToDoItemComponent): void {
        this.items.splice(this.items.indexOf(item.item), 1);
        this.items.forEach((x, i) => (x.index = i + 1));
        this.invalidate();
    }

    protected render(): string {
        return html`<div class="${styles.container}">
            <h1>TODO List (${this.items.length})</h1>
            <div class="${styles.items}">${this.items.map((x, i) => html`<todo-item ref="${x.index}"></todo-item>`).join("")}</div>
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
