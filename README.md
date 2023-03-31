# 🚀 WebComponent Framework Test

The idea is to make a simple WebComponent based framework, working with typescript and sass.
The framework must allow the following features:

## Primary Requirements

-   [x] Register custom elements.
-   [x] Render web components (preferably without shadow dom).
-   [x] Work as a library for other web-based projects (Users should be able to include script and import modules in their own files).
-   [x] Emit declaration file? (Jury is still out)
-   [x] Use sass instead of css.
-   [x] Use css/sass modules instead of plain files.
-   [x] Avoid async load of styles.
-   [x] Avoid embedded styles.
-   [x] Use typescript instead of javascript.

## Secondary Requirements

-   [x] Take advantage of typescript features like decorators.
-   [ ] Support from the get-go for transition animations on connection and disconnection from the dom.
-   [x] Support for Scoped and parental inheritance of DI Containers.
-   [ ] Add Jest unit tests.
-   [ ] Add Playwright e2e tests (cross-browser testing).
-   [ ] Add navigation support, hash and html5 enabled routing.
-   [x] Support for Array mappers in the html function.
-   [x] Add support for typed queries.
-   [x] Add support for event handlers.
-   [X] Add support for message handlers.
-   [X] Review attributes / properties names using lowercase.
-   [X] Allow to add EventHandlers over special elements like document.


## VSCode support

To better support the templates, you can install the [Lit Plugin](https://marketplace.visualstudio.com/items?itemName=runem.lit-plugin) that will add syntax highlighting for html template literals.

## Scripts

Run the library test playground:

```shell
npm start
```

Build the library:

```shell
npm run build
```
