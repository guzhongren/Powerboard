import { IAuth } from '../Constants/Auth'
import { splitSearch } from './StringUtils'

export const updateAuth = (auth: IAuth) => {
  return {
    ...auth,
    search: auth.search,
  }
}
