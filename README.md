# Prerequisites

You will need the following installed in your system:
- Node.js
- Yarn

The latest stable versions should do just fine.

# Get started

1. Clone this repo
2. Install dependencies
    ```bash
    $ yarn install
    ```

3. Create directory `components`.
4. Create directory `apps`.
5. Set your project scope
    ```bash
    $ yarn add-scope-namespace "@my-project"
    ```

# Creating apps

All apps go in the `apps` directory. We have helper scripts to easily create React apps. You'll be asked to give your app a name.

By default all your apps will be namespaced using your project's scope. For example if your project scope is `@my-project` then all your apps should be/will be under `@my-project-apps` by default.

## Next.js

Run the following to create a Next.js app:

```bash
$ yarn create-next-app awesome-app
```

## Others

If you need to create apps using other React frameworks or tooling then follow the following steps.

1. Bootstrap a new app using lerna.

    ```bash
    $ npx lerna create @my-project-apps/awesome-app apps --yes # make sure the scope is correct
    ```

    This will create a new folder `awesome-app` inside `apps`.

2. Setup your app as needed.

# Components

## Creating React Components

To create a new React component run the following:

```bash
$ yarn create-component awesome-button
```

By default all your components will be namespaced using your project's scope. For example if your project scope is `@my-project` then all your components should be/will be under `@my-project-components` by default.

If you want to change the default then edit `scripts/src/create-component`.

```javascript
// Identify all components by scope @example-app-components
const namespace = require('./create-scope-namespace')('components');
```

## Using Storybook

Storybook has already been setup for you. Just run the following in the root directory of your project:

```bash
$ yarn storybook
```

This will launch the storybook console in your browser. Storybook looks for `.stories.js` files in your `components` directory.

## Adding your components to your apps

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

# Installing packages

You'll probably need to use other packages after creating your components/apps. Just install them using yarn.

```bash
$ cd components/awesome-button
$ yarn add styled-components -P
```

Because we're using Yarn Workspaces, packages are automatically installed to the root `node_modules`.

# Development Workflow

The workflow isn't the smoothest right now. This is essentially how you will be working:

1. Create apps using our helper scripts or do it manually
2. Create React components using `yarn create-component`
3. Run `yarn storybook` and test your components
4. Build your components
5. Add it to your app's `package.json`
6. Run `yarn bootstrap`
7. Run app

Repeat steps 3, 4 and 7 while updating and testing components within apps.

# Todo

1. Hot reload across workspaces(?)
2. Scripts to create apps (Gatsby, create-react-app)
3. Setup script (set scope, namespaces, make directories, install dependencies)
4. Scripts to reset scope and namespaces