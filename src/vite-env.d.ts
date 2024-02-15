/// <reference types="vite/client" />


type JSONValue = null | boolean | string | number | JSONValue[] | Record<string, JSONValue>

type Tag = {
  id:number,
  name: string,
  sign:string,
  kind: "expenses" | "income"
}

type Item = {
  id: number,
  user_id: number,
  amount: number,
  note: string | null,
  happened_at:string,
  tag_ids: number[],
  tags:{
    id: number,
    user_id: number,
    name: string,
    sign: string,
  }[]
}

type Balance = {
  income: number,
  expenses: number,
  balance: number
}

type User = {
  id: number,
  email: string,
  name: string | null,
}

type ItemData<T = any> = {
  resources:T[],
  pager:{
    page:number,
    per_page:number,
    count:number
  }
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