# A buildKite CI monitor for show on TV


![Buildkite-Dashboard](./src/assets/Buildkite-dashboard.gif)

## Get access token

Get a buildkite access token first at https://buildkite.com/user/api-access-tokens

> Need all _read permissions_ and _Enable GraphQL API Access_

## Config app

1. Fill the `access token`
2. Fill the `organization name`
3. (Optional) Fill the `team name`
4. Fill the pipeline of buildkite name which you want to show.
    * __Single value__: This value supports regex, so you can fill the prefix of pipeline which filtered
    * __Multiple values__: you can fill your value after wrapping line
5. Click `OK` button
