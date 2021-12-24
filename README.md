# **Powerboard** A BuildKite CI monitor and utils.

[![Test and deploy](https://github.com/Apollo-for-fun/Buildkite-Dashboard/actions/workflows/main.yml/badge.svg)](https://github.com/Apollo-for-fun/Buildkite-Dashboard/actions/workflows/main.yml)

![Powerboard](./src/assets/Buildkite-dashboard.gif)

## How to use

URL schema: `https://apollo-for-fun.github.io/Powerboard/?token={TOKEN}&config={CONFIG}`

- TOKEN: refer to `Get access token`
- CONFIG: refer to `Config schema`

### Get access token

Get a buildkite access token first at https://buildkite.com/user/api-access-tokens

> Need all _read permissions_ and _Enable GraphQL API Access_

### Config schema

- Store your config in any server which this app can access, we recommend [Gist](https://gist.github.com/)
- Schema like below, you can refer to this [demo](https://gist.github.com/guzhongren/1bff33e4ee8e0d3b397ac2d4f8612a05)

  ```json
  {
    "org": String,
    "search": Array<String>,
    "team": String,
    "oncall": {
        "startDate": String,
        "names": Array<String>
    }
  }
  ```

## build & Run

```shell
npm install -g yarn
yarn
yarn dev
yarn cy:open
```

## Tech list

- [React 17](https://reactjs.org/)
- [Graphql](https://graphql.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Testing-library](https://testing-library.com/docs/react-testing-library/intro/)
- [Webpack](https://webpack.js.org/)
- [Cypress](https://www.cypress.io/)
- [SCSS](https://sass-lang.com/)
