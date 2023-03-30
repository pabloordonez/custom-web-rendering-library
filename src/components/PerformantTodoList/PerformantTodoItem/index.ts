import { ComponentBase } from "library/components";
import { Component, EventHandler } from "library/decorators/components";
import { html } from "library/interpolation";
import styles from "./TodoList.module.scss";

export class ToDoItem {
    constructor(public index: number, public message: string) {}
}

export class ToDoItemDeletedMessage {
    constructor(public readonly toDoItem: PerformantToDoItemComponent) {
    }
}

@Component({ tag: "perf-todo-item" })
export class PerformantToDoItemComponent extends ComponentBase {
    public readonly item?: ToDoItem;

    constructor() {
        super();
        this.item = new ToDoItem(0, "");
    }

    @EventHandler("change", `.message`)
    onValueChange(e: InputEvent): void {
        this.item.message = (e.currentTarget as HTMLInputElement).value;
    }

    @EventHandler("click", `#removeButton`)
    onRemoveItemClick(): void {
        this.messageBus.send(new ToDoItemDeletedMessage(this));
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
