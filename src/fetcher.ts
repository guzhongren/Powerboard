import { GraphQLClient, gql } from 'graphql-request'
import { isString, isArray, isNil } from 'lodash'
import { AUTO_RELOAD_PERIOD } from './Constants/Config'

const API = 'https://graphql.buildkite.com/v1'

export const fetcher = (query: string, token: string) => {
  return new GraphQLClient(API, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
    .request(query)
    .catch((err) => {
      console.error(
        `There are some error when request buildkite, the page will auto reload! ${err}`,
      )
      setTimeout(() => {
        window.location.reload()
      }, AUTO_RELOAD_PERIOD)
    })
}

export const buildKiteQuery = (
  orz: string,
  team: string,
  search: string[] | string,
  isOnlyMainBranch: boolean,
) => {
  const buildPipelineQuery = (pipeline: string, index?: number) => `
    pipelines${isNil(index) ? '' : index}: pipelines(first:10 ${
    team ? `,team: "${team}"` : ''
  } ${pipeline ? `,search: "${pipeline}"` : ''}) {
      edges {
        node {
          name
          slug
          metrics {
            edges {
              node {
                id,
                label,
                value
              }
            }
          }
          repository {
            url
          }
          builds(first:11 ${
            isOnlyMainBranch ? ' ,branch: ["main", "master"]' : ''
          }) {
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
                jobs(first: 100, order: RECENTLY_ASSIGNED) {
                  edges {
                    node {
                       ... on JobTypeCommand {
                        id
                        label
                        passed
                        state
                        pipeline {
                          id
                          createdBy {
                            id
                            name
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

  return gql`
    {
      organization(slug: "${orz.toLowerCase()}") {
        name
        ${isString(search) ? buildPipelineQuery(search) : ''}
        ${isArray(search) ? search.map(buildPipelineQuery) : ''}
      }
    }
    `
}
