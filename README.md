# **Powerboard** A BuildKite CI monitor and utils.

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

[![Test and deploy](https://github.com/guzhongren/Powerboard/actions/workflows/main.yml/badge.svg)](https://github.com/guzhongren/Powerboard/actions/workflows/main.yml) [![Lighthouse](https://github.com/guzhongren/Powerboard/actions/workflows/Lighthouse.yml/badge.svg)](https://github.com/guzhongren/Powerboard/actions/workflows/Lighthouse.yml)
![Powerboard](./src/assets/Buildkite-dashboard.gif)

## How to use

URL schema: `https://guzhongren.github.io/Powerboard/?token={TOKEN}&config={CONFIG}`

- TOKEN: refer to `Get access token`
- CONFIG: refer to `Config schema`

### Get access token

Get a buildkite access token first at https://buildkite.com/user/api-access-tokens

> Just need _Organization Access_, and _Enable GraphQL API Access_

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

- Firstly, you should get your Buildkite token and export it in current shell.

```shell
export BUILDKITE_TOKEN=xxxx
```

- Secondly, run

```shell
npm install -g pnpm
pnpm install
pnpm dev
pnpm cy:open
```

## Tech list

- [React 17](https://reactjs.org/)
- [Graphql](https://graphql.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Testing-library](https://testing-library.com/docs/react-testing-library/intro/)
- [Webpack](https://webpack.js.org/)
- [Cypress](https://www.cypress.io/)
- [SCSS](https://sass-lang.com/)

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://guzhongren.github.io/"><img src="https://avatars.githubusercontent.com/u/8743692?v=4?s=100" width="100px;" alt=""/><br /><sub><b>guzhongren</b></sub></a><br /><a href="https://github.com/guzhongren/Powerboard/commits?author=guzhongren" title="Code">💻</a> <a href="https://github.com/guzhongren/Powerboard/commits?author=guzhongren" title="Documentation">📖</a> <a href="#infra-guzhongren" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#design-guzhongren" title="Design">🎨</a> <a href="#eventOrganizing-guzhongren" title="Event Organizing">📋</a> <a href="#ideas-guzhongren" title="Ideas, Planning, & Feedback">🤔</a> <a href="#maintenance-guzhongren" title="Maintenance">🚧</a> <a href="#platform-guzhongren" title="Packaging/porting to new platform">📦</a> <a href="https://github.com/guzhongren/Powerboard/pulls?q=is%3Apr+reviewed-by%3Aguzhongren" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/guzhongren/Powerboard/commits?author=guzhongren" title="Tests">⚠️</a> <a href="#tutorial-guzhongren" title="Tutorials">✅</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
