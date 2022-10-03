import { validateJson } from './StringUtils'

export const convertToJSON = (config: any) => {
  if (typeof config === 'string' && config.length > 0 && validateJson(config)) {
    return JSON.parse(config)
  }
  return config
}

export const convertToString = (info: any) => {
  if (typeof info === 'object') {
    return JSON.stringify(info, null, 2)
  }
  return info
}
