export const splitSearch = (searchString: string) => {
  return searchString ? searchString.split('\n') : []
}

export const validateJson = (str: string) => {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}
