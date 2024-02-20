import { AxiosResponse } from 'axios';
import { defineStore } from "pinia"
import { http } from '../shared/http/http';

type MeState = {
  me?:User
  mePromise?:Promise<AxiosResponse<Resource<User>>>
}

type MeActions = {
  refreshMe:() => void,
  fetchMe:() => void
}

export const useMeStore = defineStore<string,MeState,{},MeActions>('meStore', {
  state: () => ({
    me:undefined, 
    mePromise:undefined
  }),

  actions: {
    refreshMe() {
      this.mePromise = http.get('/me')
    },
    fetchMe(){
      this.refreshMe()
    }
  },
})