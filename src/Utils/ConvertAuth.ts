import { IAuth } from '../Constants/Auth'

export const updateAuth = (auth: IAuth) => {
  return {
    ...auth,
    search: auth.search,
  }
}
