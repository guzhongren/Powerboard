import { LAYOUT__KEY } from '../Constants/Grid'
import { LOCAL_STORAGE_KEY } from '../Constants/Storage'
import { getValueByKey, saveValue } from './LocalStorageUtils'

export const getLayouts = () => {
  let ls: {
    [key: string]: any
  } = {}
  ls = JSON.parse(getValueByKey(LOCAL_STORAGE_KEY)) || {}
  return ls[LAYOUT__KEY]
}

export const saveLayouts = (value: any) => {
  saveValue(
    LOCAL_STORAGE_KEY,
    JSON.stringify({
      [LAYOUT__KEY]: value,
    }),
  )
}
