# A BuildKite CI Monitor for showing on TV

![Test and deploy](https://github.com/guzhongren/Buildkite-Dashboard/workflows/Test%20and%20deploy/badge.svg)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fguzhongren%2FBuildkite-Dashboard.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fguzhongren%2FBuildkite-Dashboard?ref=badge_shield)


![Buildkite-Dashboard](https://cdn.jsdelivr.net/gh/guzhongren/data-hosting@main/Buildkite-Dashboard2021-10-10-222918.6j7mi2nsatk0.gif)

## Get access token

Get a buildkite access token first at https://buildkite.com/user/api-access-tokens

> Need all _read permissions_ and _Enable GraphQL API Access_

## Config app

Open app: [https://guzhongren.github.io/Buildkite-Dashboard/](https://guzhongren.github.io/Buildkite-Dashboard/)

* Fill the `access token`
* Fill the `organization name`
* (Optional) Fill the `team name`
* Fill the pipeline of buildkite name which you want to show.
  * __Single value__: This value supports regex, so you can fill the prefix of pipeline which filtered
  * __Multiple values__: you can fill your value after wrapping line
* Click `OK` button

## Build & Run

```shell
npm install -g yarn
yarn
yarn dev
yarn cy:open
```

## Release

```shell
yarn [minor|major]release
git push origin v2.0.0
```

## Tech list

* [React 17](https://reactjs.org/)
* [Graphql](https://graphql.org/)
* [TypeScript](https://www.typescriptlang.org/)
* [Testing-library](https://testing-library.com/docs/react-testing-library/intro/)
* [Webpack](https://webpack.js.org/)
* [Cypress](https://www.cypress.io/)
* [SCSS](https://sass-lang.com/)




## License
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fguzhongren%2FBuildkite-Dashboard.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fguzhongren%2FBuildkite-Dashboard?ref=badge_large)
