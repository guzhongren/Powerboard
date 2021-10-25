# **Powerboard** A BuildKite CI monitor and utils.

[![Test and deploy](https://github.com/Apollo-for-fun/Buildkite-Dashboard/actions/workflows/main.yml/badge.svg)](https://github.com/Apollo-for-fun/Buildkite-Dashboard/actions/workflows/main.yml)

![Powerboard](./src/assets/Buildkite-dashboard.gif)

## Get access token

Get a buildkite access token first at https://buildkite.com/user/api-access-tokens

> Need all _read permissions_ and _Enable GraphQL API Access_

## Config app

Open app: [https://apollo-for-fun.github.io/powerboard/](https://apollo-for-fun.github.io/powerboard/)

* Fill the `access token`
* Fill the `organization name`
* (Optional) Fill the `team name`
* Fill the pipeline of buildkite name which you want to show.
  * __Single value__: This value supports regex, so you can fill the prefix of pipeline which filtered
  * __Multiple values__: you can fill your value after wrapping line
* Click `OK` button

## build & Run

```shell
npm install -g yarn
yarn
yarn dev
yarn cy:open
```

## Tech list

* [React 17](https://reactjs.org/)
* [Graphql](https://graphql.org/)
* [TypeScript](https://www.typescriptlang.org/)
* [Testing-library](https://testing-library.com/docs/react-testing-library/intro/)
* [Webpack](https://webpack.js.org/)
* [Cypress](https://www.cypress.io/)
* [SCSS](https://sass-lang.com/)
