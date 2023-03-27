export * from "components/TestComponent";
export * from "components/TodoList";
export * from "components/PerformantTodoList";

import { ComponentTypeCollection } from "library/decorators/components";
import { html } from "./library/interpolation";
import styles from "./index.module.scss";

ComponentTypeCollection.globalInstance.defineAll();

document.getElementById("root").innerHTML = html`
    <main class="${styles.main}">
        <h1>Test Page</h1>
        <todo-list></todo-list>
        <perf-todo-list></perf-todo-list>
        <test-component name="Peter O'Tool" age="16"></test-component>
    </main>
`;
