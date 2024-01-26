export interface FData {
  [k:string]:string | number | null | undefined | FData
}

export type Rule<T> = {
  key:keyof T,
  message:string,
} & (
  {type:"pattern",exp:RegExp} | 
  {type:"require",require:boolean}
  )

export type Rules<T> = Rule<T>[]

export type FormError<T> = {
  [k in keyof T]?: string[]
}

export const validata = <T extends FData>(formData:T,rules:Rules<T>) => {
  

  const error:FormError<T> = {}

  rules.forEach(rule => {
    let {key,message} = rule
    let value = formData[key]

    if (rule.type === "require") {
      if (value === null || value === undefined || value === "") {
        error[key] = error[key] ?? []
        error[key]?.push(message)
      }
    }else if (rule.type === "pattern") {
      if (value && !rule.exp.test(value?.toString())) {
        error[key] = error[key] ?? []
        error[key]?.push(message)
      }
    }
  })

  return error
}

export const hasError = (error:Record<string,string[]>) => {
  let result = false
  for (const key in error) {
    if (error[key].length > 0) {
      result = true
      break
    }
  }
  return result
}