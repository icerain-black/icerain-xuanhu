/// <reference types="vite/client" />


type JSONValue = null | boolean | string | number | JSONValue[] | Record<string, JSONValue>

type Tag = {
  id:number,
  name: string,
  sign:string,
  kind: "expenses" | "income"
}

type itemCreateRes = {
  id: number,
  user_id: number,
  amount: number,
  note: string | null,
  tag_ids: number[],
}



type TagData<T = any> = {
  resources:T[],
  pager:{
    page:number,
    per_page:number,
    count:number
  }
}

type Resource<T> = {
  resource:T
}

type ResourceError = {
  errors: Record<string, string[]>
}