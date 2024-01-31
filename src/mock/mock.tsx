import { faker } from '@faker-js/faker'
import { AxiosRequestConfig } from 'axios';

type Mock = (config: AxiosRequestConfig) => [number, any]

faker.setLocale('zh_CN');

export const mockSession: Mock = (config) =>{
  return [200, {
    jwt: faker.random.word()
  }]
}

export const mockTagIndex:Mock = (config) => {
  const {kind,page} = config.params
  let id = 0
  const createId = () => {
    id += 1
    return id
  }

  const createTag = (num = 1,attrs?: any) => 
     Array.from({length:num}).map(() => ({
      id:createId(),
      name:faker.lorem.word(),
      sign:faker.internet.emoji(),
      kind:config.params.kind
    }))

  const createTagData = (tagNumber:number,page:number) => {
    let count = 26
    return {
      resources:createTag(tagNumber),
      pager:{
        page,
        per_page:25,
        count
      }
    }
  }

  if (kind === "expenses" && !page || page === 1  ) {
    return [200,createTagData(25,page)]
  }else if (kind === "expenses" && page === 2) {
    return [200,createTagData(1,page)]
  }else if (kind === "income" && !page || page === 1) {
    return [200,createTagData(25,page)]    
  }{
    return [200,createTagData(1,page)]
  }
}