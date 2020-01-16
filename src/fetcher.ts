import { GraphQLClient } from 'graphql-request'

const API = 'https://graphql.buildkite.com/v1'

export const fetcher = (query: string, token: string) => {
  return new GraphQLClient(API, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).request(query)
}

export const buildKiteQuery = (orz: string, team: string, search: string) => `
{
  organization(slug: "${orz}") {
    name
    pipelines(first:10, team: "${team}",search: "${search}") {
      edges {
        node {
          name
          slug
          builds(first:5) {
            edges {
              node {
                id
                branch
                message
                createdBy {
                  ... on User {
                    name
                  }
                  ... on UnregisteredUser {
                    name
                  }
                }
                number
                state
                startedAt
                finishedAt
                url
                jobs(first: 20, order: RECENTLY_ASSIGNED) {
                  edges {
                    node {
                       ... on JobTypeCommand {
                        id
                        label
                        passed
                        state
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

`
