import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { mockItemCreate, mockSession, mockTagIndex } from "../../mock/mock";

type GetConfig = Omit<AxiosRequestConfig, 'params' | 'url' | 'method'>
type PostConfig = Omit<AxiosRequestConfig, 'url' | 'data' | 'method'>
type PatchConfig = Omit<AxiosRequestConfig, 'url' | 'data'>
type DeleteConfig = Omit<AxiosRequestConfig, 'params'>

class Http{
  instance:AxiosInstance
  constructor(baseURL:string ){
    this.instance = axios.create({
      baseURL
    })
  }

  get<R = unknown>(url: string, query?: Record<string, JSONValue>, config?: GetConfig) {
    return this.instance.request<R>({
      ...config,
      url,
      params:query,
      method:"get"
    })
  }

  post<R = unknown>(url: string, data?: Record<string, JSONValue>, config?: PostConfig) {
    return this.instance.request<R>({
      ...config,
      url,
      data,
      method:"post"
    })
  }

  patch<R = unknown>(url: string, data?: Record<string, JSONValue>, config?: PatchConfig) {
    return this.instance.request<R>({
      ...config,
      url,
      data,
      method:"patch"
    })
  }

  delete<R = unknown>(url: string, query?: Record<string, string>, config?: DeleteConfig) {
    return this.instance.request<R>({
      ...config,
      url,
      params:query,
      method:"delete"
    })
  }
}

const mock = (response: AxiosResponse) => {
  if (location.hostname !== 'localhost'
    && location.hostname !== '127.0.0.1'
    && location.hostname !== '192.168.3.57') { return false }
  switch (response.config?.params?._mock) {
    case 'tagIndex':
      [response.status, response.data] = mockTagIndex(response.config)
      return true
    case 'session':
      [response.status, response.data] = mockSession(response.config)
      return true
    case "itemCreate":
      [response.status,response.data] = mockItemCreate(response.config)
      return true
  }
  return false
}

export const http = new Http("/api/v1")

http.instance.interceptors.request.use(config => {
  const token = localStorage.getItem("jwt")
  if (token) {
    config.headers!.Authorization = `Bearer ${token}`
  }
  return config
})

http.instance.interceptors.response.use((response) => {
  mock(response)
  if (response.status >= 400) {
    throw { response }
  } else {
    return response
  }
}, (error) => {
  mock(error.response)
  if (error.response.status >= 400) {
    throw error
  } else {
    return error.response
  }
})

http.instance.interceptors.response.use(res => {
  return res
},error => {
  if (error.response) {
    const axiosError = error as AxiosError
    if (axiosError.response?.status === 429) {
      alert("请求太频繁了")
    }
  }
  throw error
})

