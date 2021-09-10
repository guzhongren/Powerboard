import { isArray, set } from 'lodash'

export const mergePipelinesWithResponse: any = (resData: any) => {
  const pipelines = []
  let i = 0
  while (resData?.organization[`pipelines${i}`]) {
    pipelines.push(resData?.organization[`pipelines${i}`])
    i++
  }

  set(resData, ['organization', 'pipelines', 'edges'], [])

  pipelines.forEach((pipeline) => {
    resData.organization.pipelines.edges =
      resData.organization.pipelines.edges.concat(pipeline.edges)
  })

  return resData
}
