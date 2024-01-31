/// <reference types="vite/client" />


type JSONValue = null | boolean | string | number | JSONValue[] | Record<string, JSONValue>

type Tag = {
  id:string,
  name: string,
  sign:string,
  kind: "expenses" | "income"
}

type TagData<T = any> = {
  resources:T[],
  pager:{
    page:number,
    per_page:number,
    count:number
  }
}