# A buildKite CI monitor for show on TV

![Test and deploy](https://github.com/guzhongren/Buildkite-Dashboard/workflows/Test%20and%20deploy/badge.svg)


![Buildkite-Dashboard](./src/assets/Buildkite-dashboard.gif)

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
