export { TestComponent } from "./components/TestComponent";
export { ToDoListComponent, ToDoItemComponent } from "./components/TodoList";
import { ComponentTypeCollection } from "./library/decorators/components";
import { html } from "./library/interpolation";
import styles from "./index.module.scss";

ComponentTypeCollection.globalInstance.defineAll();

document.getElementById("root").innerHTML = html`
    <div class="${styles.main}">Test Page</div>
    <todo-list></todo-list>
    <test-component name="Peter O'Tool" age="16"></test-component>
`;
