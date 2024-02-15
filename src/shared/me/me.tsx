import { AxiosResponse } from "axios";
import { http } from "../http/http";

export let mePromise: Promise<AxiosResponse<Resource<User>>> | undefined

export const refreshMe = () => {
  mePromise = http.get('/me')
  return mePromise
}

export const fetchMe = refreshMe