export const importJsonFile = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsText(file)
    reader.onload = () => {
      try {
        resolve(JSON.parse(reader.result as string))
      } catch (err) {
        reject(new Error('Parse json error: ' + err.toString()))
      }
    }
    reader.onerror = () => {
      console.log(reader.error)
      reject(reader.error.toString())
    }
  })
}

export const downloadConfig = (
  dlAnchorElem: any,
  data: any,
  fileName: string,
) => {
  const dataStr =
    'data:text/json;charset=utf-8,' +
    encodeURIComponent(JSON.stringify(data, null, 2))
  dlAnchorElem.setAttribute('href', dataStr)
  dlAnchorElem.setAttribute('download', fileName)
  dlAnchorElem.click()
}
