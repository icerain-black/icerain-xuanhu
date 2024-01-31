import { AxiosResponse } from "axios";
import { onMounted, ref } from "vue";

type Fetcher = (page:number) => Promise<AxiosResponse<any, any>>

export const useTags = (fetcher:Fetcher) => {
  const refHasMore = ref(false);
  const refPage = ref(0)
  const refTags = ref<Tag[]>([]);

  const fetcherTags =async () => {
    const res = await fetcher(refPage.value)
    const {resources,pager} = res.data
    refPage.value = pager.page
    refTags.value.push(...resources)
    refHasMore.value = ((pager.page - 1) * pager.per_page + refTags.value.length) < pager.count
  }

  onMounted(fetcherTags)

  return {
    refHasMore,
    refPage,
    refTags,
    fetcherTags
  }
}