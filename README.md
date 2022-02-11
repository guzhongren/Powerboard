# **Powerboard** A BuildKite CI monitor and utils.

[![Test and deploy](https://github.com/guzhongren/Powerboard/actions/workflows/main.yml/badge.svg)](https://github.com/guzhongren/Powerboard/actions/workflows/main.yml)

![Powerboard](./src/assets/Buildkite-dashboard.gif)

## How to use

URL schema: `https://guzhongren.github.io/Powerboard/?token={TOKEN}&config={CONFIG}`

- TOKEN: refer to `Get access token`
- CONFIG: refer to `Config schema`

### Get access token

Get a buildkite access token first at https://buildkite.com/user/api-access-tokens

> Need all _read permissions_ and _Enable GraphQL API Access_

### Config schema

- Store your config in any server which this app can access, we recommend [GitHub repo](https://github.com/), and proxy the URL of GitHub file
- Config schema like below

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

  | Field            | Mandatory | Description                                                                             |
  | ---------------- | --------- | --------------------------------------------------------------------------------------- |
  | org              | true      | The name of your buildkit account                                                       |
  | team             | false     | Team name                                                                               |
  | search           | false     | The collection of pipelines under your org                                              |
  | oncall           | false     | On-call config                                                                          |
  | oncall.startDate | true      | The start date, app will use it as start date, Poll every seven days to the next person |
  | oncall.names     | true      | On-call list                                                                            |

  #### Demo

  ```json
  {
    "org": "elastic",
    "team": "",
    "search": ["kibana / on merge", "apm-onweek-alerts-as-code"],
    "oncall": {
      "startDate": "2021-11-10",
      "names": ["Chen", "Adam"]
    }
  }
  ```

## Build & Run

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
