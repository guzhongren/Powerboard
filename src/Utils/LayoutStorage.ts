import { LAYOUT__KEY } from '../Constants/Grid'
import { LOCAL_STORAGE_KEY } from '../Constants/Storage'

export const getLayouts = () => {
  let ls: {
    [key: string]: any,
  } = {}
  if (window.localStorage) {
    try {
      ls = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY)) || {}
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[LAYOUT__KEY]
}

export const saveLayouts = ( value: any) => {
  if (window.localStorage) {
    window.localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({
        [LAYOUT__KEY]: value,
      })
    )
  }
}
