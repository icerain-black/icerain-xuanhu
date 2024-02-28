import { defineStore } from "pinia";

type UserKindStoreState = {
  kind:"expenses" | "income",
  chartKind:"expenses" | "income"
}

type UserKindStoreActions = {
  changeKind:(kind:"expenses" | "income") => void
  changeChartKind:(chartsKind:"expenses" | "income") => void
}

export const useUserKindStore = defineStore<string,UserKindStoreState,{},UserKindStoreActions>("userKindStore",{
  state: () => ({
    kind:"expenses",
    chartKind:"expenses"
  }),

  actions:{
    changeKind(kind){
      this.kind = kind
    },
    changeChartKind(chartsKind){
      this.chartKind = chartsKind
    }
  }
})