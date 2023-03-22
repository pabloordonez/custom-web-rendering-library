import { ToDoItem, ToDoItemComponent } from "components/TodoList/TodoItem";
import { ComponentBase } from "library/components";
import { Component, EventHandler } from "library/decorators/components";
import { html } from "library/interpolation";
import styles from "./PerformantTodoList.module.scss";

@Component({ selector: "perf-todo-list" })
export class PerformantToDoListComponent extends ComponentBase {
    private readonly items: ToDoItemComponent[];

    constructor() {
        super();
        this.items = [];
    }

    @EventHandler(`#addButton`, "click")
    onAddItemClick(): void {
        const view = new ToDoItemComponent();
        view.item = new ToDoItem(this.items.length + 1, "");
        this.items.push(view);
        this.invalidate(false);
    }

    @EventHandler(`todo-item`, "onRemove")
    onRemoveItem(e: CustomEvent<ToDoItemComponent>): void {
        const item = e.detail;
        const itemViews = this.refs.itemViews as HTMLDivElement;

        itemViews?.removeChild(item);
        this.items.splice(this.items.indexOf(item), 1);
        this.items.forEach((x, i) => {
            x.item.index = i + 1;
            x.invalidate();
        });

        this.invalidate(false);
    }

    protected render(): string {
        return html`<div class="${styles.container}">
            <h2>Faster TODO List (${this.items.length})</h2>
            <div class="${styles.items}" ref="itemViews"></div>
            <div>
                <button id="addButton">Add Item</button>
            </div>
        </div>`;
    }

    protected afterRender(): void {
        const itemViews = this.refs.itemViews as HTMLDivElement;
        if (!itemViews) return;
        for (const view of this.items) {
            if (view.isConnected) continue;
            itemViews.appendChild(view);
        }
    }
}
