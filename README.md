# Prerequisites

You will need the following installed in your system:
- Node.js
- Yarn

The latest stable versions should do just fine.

# Get started

1. Create directory `components`.
2. Create directory `apps`.
3. Change your project namespace in `scripts/create-scope-namespace.js`. This namespace is used whenever you create components.

    ```javascript
    // Change this!
    const namespace = '@example-app';
    ```

# Creating React Components

To create a new React component run the following:

```bash
$ yarn create-component
```

You will be asked to give your component a name.

DO NOT USE SCOPES! Set the scope using `create-scope-namespace.js`.

```bash
$ yarn create-component
Component Name: @my-project/awesome-button # bad
```

```bash
$ yarn create-component
Component Name: awesome-button # good
```

See `scripts/create-component.js` for an example.

```javascript
// Identify all components by scope @example-app-components
const namespace = require('./create-scope-namespace')('components');
```

# Installing packages

You'll probably need to use other packages after creating your components/apps. Just install them using yarn.

```bash
$ cd components/awesome-button
$ yarn add styled-components -P
```

Because we're using Yarn Workspaces, packages are automatically installed to the root `node_modules`.

# Creating apps

All apps go in the `apps` directory. Use Gatsby, Next.js, create-react-app, whatever you are most comfortable with. Just make sure that dependencies are being installed using yarn. If they're not, or you're not sure that they are, simply delete the `node_modules` directory after your app has been bootstrapped and run `yarn install`.

# How do I use components from within apps?

You need to summon the secret powers of the underw...

Let's say you finished creating your `awesome-button` and now need to use it in your `awesome-app`. First build your component.

```bash
$ cd components/awesome-button
$ yarn build
```

Then edit the `package.json` in your app.

```json
{
  "dependencies": {
    "@my-project/awesome-button": "*"
  }
}
```

And finally run the following in the root directory of your project:

```bash
$ yarn bootstrap
```

NOTE: You will need to build your component everytime you change it before being able to use it in your app.

# Using Storybook

Storybook has already been setup for you. Just run the following in the root directory of your project:

```bash
$ yarn storybook
```

This will launch the storybook console in your browser. Storybook looks for `.stories.js` files in your `components` directory.

# Development Workflow

The workflow isn't the smoothest right now. This is essentially how you will be working:

1. Create a new component using `yarn create-component`
2. Run `yarn storybook` and test your component
3. Build your component
4. Add it to your app's `package.json`
5. Run `yarn bootstrap`
6. Run app
7. Repeat (skip steps 4 and 5 when updating components)

# Todo

1. Hot reload across workspaces(?)
2. Scripts to create apps (Gatsby, Next.js, create-react-app)