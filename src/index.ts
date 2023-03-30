export * from "components/TestComponent";
export * from "components/TodoList";
export * from "components/PerformantTodoList";
export * from "components/InnerContentTest";
export * from "components/EditableComponent";

import { ComponentTypeCollection } from "library/decorators/components";
import { html } from "./library/interpolation";
import styles from "./index.module.scss";

ComponentTypeCollection.globalInstance.defineAll();

if (process.env.REQUIRE_ROOT === "true") {
    document.getElementById("root").innerHTML = html`
        <main class="${styles.main}">
            <h1>Test Page</h1>
            <todo-list></todo-list>
            <perf-todo-list></perf-todo-list>
            <test-component name="Peter O'Tool" age="16"></test-component>
            <inner-content-test>
                <span id="name">Outside</span>
                <span id="description">This content is being sent from outside.</span>
            </inner-content-test>
			<editable-component headertext="Editable component" paragraphtext="Edit me! You know you want it!"></editable-component>
        </main>
    `;
}
