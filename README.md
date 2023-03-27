# 🚀 WebComponent Framework Test

The idea is to make a simple WebComponent based framework, working with typescript and sass.
The framework must allow the following features:

## Primary Requirements

- [X] Register custom elements.
- [X] Render web components (preferably without shadow dom).
- [X] Work as a library for other web-based projects (Users should be able to include script and import modules in their own files).
- [X] Emit declaration file? (Jury is still out)
- [X] Use sass instead of css.
- [X] Use css/sass modules instead of plain files.
- [X] Avoid async load of styles.
- [X] Avoid embedded styles.
- [X] Use typescript instead of javascript.

## Secondary Requirements

- [X] Take advantage of typescript features like decorators.
- [ ] Support from the get-go for transition animations on connection and disconnection from the dom.
- [X] Support for Scoped and parental inheritance of DI Containers.
- [ ] Add Jest unit tests.
- [ ] Add Playwright e2e tests (cross-browser testing).
- [ ] Add navigation support, hash and html5 enabled routing.
- [X] Support for Array mappers in the html function.
- [X] Add support for typed queries.
- [X] Add support for event handlers.

## Scripts

Run the library test playground:

```shell
npm start
```

Build the library:

```shell
npm run build
```
