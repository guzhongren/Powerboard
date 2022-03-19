export const convertToJSON = (config: any) => {
  if (typeof config === 'string') {
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
