import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import useSWR, { ConfigInterface, responseInterface } from 'swr'

export type GetRequest = AxiosRequestConfig | null

export interface IConfig<Data = unknown, Error = unknown>
  extends Omit<ConfigInterface<AxiosResponse<Data>, AxiosError<Error>>, 'initialData'> {
  initialData?: Data
}

interface IReturn<Data, Error>
  extends Pick<responseInterface<AxiosResponse<Data>, AxiosError<Error>>, 'isValidating' | 'revalidate' | 'error'> {
  data: Data | undefined
  response: AxiosResponse<Data> | undefined
}

export default function useRequest<Data = unknown, Error = unknown>(
  request: GetRequest,
  {initialData, ...config}: IConfig<Data, Error> = {}
): IReturn<Data, Error> {
  const {data: response, error, isValidating, revalidate} = useSWR<AxiosResponse<Data>, AxiosError<Error>>(
    request && JSON.stringify(request), () => axios(request || {}), {
      ...config,
      initialData: initialData && {
        status: 200,
        statusText: 'InitialData',
        config: request,
        headers: {},
        data: initialData,
      },
    })

  return {
    data: response && response.data,
    response,
    error,
    isValidating,
    revalidate,
  }

}
