import {IAuth} from '../Constants/Auth'
import { splitSearch } from "./StringUtils";

export const updateAuth = (auth: IAuth) => {
  return {
    ...auth,
    search: splitSearch(auth.search),
  };
};

export const convertToJSON = (config: any) => {
  if (typeof(config) === 'string') {
    return JSON.parse(config)
  }
  return config
}

export const convertToString = (info: any) => {
  if (typeof(info) === 'object') {
    return JSON.stringify(info)
  }
  return info
}

