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
        this.registerEvent("#removeButton", "click", () => this.onRemoveItemClick());
    }

    private onAddItemClick(): void {
        this.items.push(new ToDoItem(this.items.length + 1, ""));
        this.invalidate();
    }

    private onRemoveItemClick(): void {
        this.items.splice(this.items.length - 1, 1);
        this.invalidate();
    }

    protected render(): string {
        return html`<div class="${styles.container}">
            <h1>TODO List (${this.items.length})</h1>
            <div class="${styles.items}">${this.items.map((x, i) => html`<todo-item key="${x.index}"></todo-item>`).join("")}</div>
            <div>
                <button id="addButton">Add Item</button>
                <button id="removeButton">Remove Item</button>
            </div>
        </div>`;
    }

    protected afterRender(): void {
        const todoItemViews = this.querySelectorAll<ToDoItemComponent>("todo-item");

        todoItemViews.forEach(todoItemView => {
            const todoItem = this.items.find(x => x.index === Number(todoItemView.getAttribute("key")));

            if (todoItem) {
                todoItemView.item = todoItem;
            }
        });
    }
}
