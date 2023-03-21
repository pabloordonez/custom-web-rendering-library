import styles from "./index.module.scss";
import { ComponentTypeCollection } from "./library/decorators/component/ComponentTypeCollection";
import html from "./library/interpolation/html";
export { TestComponent } from "./components/TestComponent";
export { ToDoListComponent, ToDoItemComponent} from "./components/TodoList";

ComponentTypeCollection.globalInstance.defineAll();
document.getElementById("root").innerHTML = html`
    <div class="${styles.main}">Test Page</div>
    <todo-list></todo-list>
    <test-component name="Peter O'Tool" age="16"></test-component>
`;
