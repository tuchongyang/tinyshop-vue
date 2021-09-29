import { ref } from "vue"
import api from "@/api"
/**轮播图逻辑 */
export const useSwiperHook = () => {
  const current = ref(0)
  const swipes = ref([])
  const onChange = (index) => {
    current.value = index
  }
  const loadData = () => {
    api.shop.banner.list().then((res) => {
      swipes.value = res
    })
  }
  loadData()

  return {
    current,
    onChange,
    swipes,
  }
}

/**商品列表 */
export const useProductHook = () => {
  const list = ref([])
  const loading = ref(false)
  const finished = ref(false)
  const refreshing = ref(false)
  const params = ref({
    page: 0,
    pageSize: 10,
  })
  const loadData = () => {
    if (finished.value) {
      return
    }
    params.value.page++
    loading.value = true
    api.shop.good
      .list(params.value)
      .then((res) => {
        if (refreshing.value) {
          list.value = []
        }
        list.value = list.value.concat(res.rows)
        if (list.value.length >= res.count) {
          finished.value = true
        }
      })
      .finally(() => {
        loading.value = false
        refreshing.value = false
      })
  }
  const onRefresh = () => {
    params.value.page = 0
    finished.value = false
    loadData()
  }
  loadData()

  return {
    list,
    loading,
    finished,
    refreshing,
    loadData,
    onRefresh,
  }
}
