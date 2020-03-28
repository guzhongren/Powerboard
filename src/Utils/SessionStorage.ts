import { LOCAL_SESSION_STORAGE_KEY } from '../Constants/Storage'

export const getValueFromSession = (key: string) => {
  let session: {
    [key: string]: any,
  } = {}
  if (window.sessionStorage) {
    try {
      session = JSON.parse(window.sessionStorage.getItem(key)) || {}
    } catch (e) {
      /*Ignore*/
    }
  }
  return session
}

export const saveValueToStorage = (key: string, value: any) => {
  if (window.sessionStorage) {
    window.sessionStorage.setItem(
      key,
      JSON.stringify(value)
    )
  }
}

export const saveIsFirstRenderStatus = (isFirst: boolean) => {
  saveValueToStorage(LOCAL_SESSION_STORAGE_KEY, {
    isFirst,
  })
}
export const isFirstRender = () => {
  return getValueFromSession(LOCAL_SESSION_STORAGE_KEY)?.isFirst || true
}
