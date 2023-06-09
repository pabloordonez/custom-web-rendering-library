import { ComponentBase } from "library/components";
import { Component, EventHandler, MessageHandler, Query } from "library/decorators/components";
import { html } from "library/interpolation";
import { PerformantToDoItemComponent, ToDoItemDeletedMessage } from "./PerformantTodoItem";
import styles from "./PerformantTodoList.module.scss";

@Component({ tag: "perf-todo-list" })
export class PerformantToDoListComponent extends ComponentBase {
    @Query("#itemViews")
    private readonly itemViews: HTMLDivElement;

    @Query("#counter")
    private readonly counter: HTMLSpanElement;

    constructor() {
        super();
    }

    @EventHandler("click", `#addButton`)
    onAddItemClick(): void {
        if (!this.itemViews) return;
        const view = new PerformantToDoItemComponent();
        view.item.index = this.itemViews.children.length + 1;
        this.itemViews.appendChild(view);
        this.updateCounter();
        this.invalidate(false);
    }

    @MessageHandler()
    onRemoveItem(message: ToDoItemDeletedMessage): void {
        const item = message.toDoItem;
        this.itemViews?.removeChild(item);
        this.itemViews.childNodes.forEach((x: PerformantToDoItemComponent, i: number) => {
            x.item.index = i + 1;
            x.invalidate();
        });
        this.updateCounter();
        this.invalidate(false);
    }

    private updateCounter(): void {
        if (!this.counter) return;
        this.counter.innerText = this.itemViews.children.length.toString();
    }

    protected render(): string {
        return html`<div class="${styles.container}">
            <h2>Faster TODO List (<span id="counter">0</span>)</h2>
            <div class="${styles.items}" id="itemViews"></div>
            <div>
                <button id="addButton">Add Item</button>
            </div>
        </div>`;
    }
}
