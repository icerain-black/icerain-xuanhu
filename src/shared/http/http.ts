import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";

class Http{
  instance:AxiosInstance
  constructor(baseURL:string ){
    this.instance = axios.create({
      baseURL
    })
  }

  get(url:string,query?:Record<string,any>,config?:Omit<AxiosRequestConfig,"url" | "params" | "method">){
    return this.instance.request({
      ...config,
      url,
      params:query,
      method:"get"
    })
  }

  post(url:string,data?:Record<string,any>,config?:Omit<AxiosRequestConfig,"url" | "data" | "method">){
    return this.instance.request({
      ...config,
      url,
      data,
      method:"post"
    })
  }

  patch(url:string,data?:Record<string,any>,config?:Omit<AxiosRequestConfig,"url" | "data" | "method">){
    return this.instance.request({
      ...config,
      url,
      data,
      method:"patch"
    })
  }

  delete(url:string,query?:Record<string,any>,config?:Omit<AxiosRequestConfig,"url" | "params" | "method">){
    return this.instance.request({
      ...config,
      url,
      params:query,
      method:"delete"
    })
  }
}

export const http = new Http("/api/v1")

http.instance.interceptors.request.use(config => {
  const token = localStorage.getItem("jwt")
  if (token) {
    config.headers!.Authorization = `Bearer ${token}`
  }
  return config
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