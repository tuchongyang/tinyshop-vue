<template>
  <div class="ad-container has-footer">
    <van-address-edit
      :area-list="areaList"
      :address-info="addressInfo"
      show-postal
      show-set-default
      show-search-result
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
    />
  </div>
</template>
<script>
import { defineComponent, ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import api from "@/api"
import { areaList } from "@vant/area-data"
import { Toast } from "vant"

export default defineComponent({
  setup() {
    const route = useRoute()
    const router = useRouter()
    const addressInfo = ref({})
    const getData = () => {
      const id = route.query.id
      if (!id) return

      api.member.address.detail(id).then((res) => {
        addressInfo.value = res
      })
    }
    getData()
    const onSave = (data) => {
      api.member.address.save(data).then(() => {
        Toast.success("保存成功")
        router.back()
      })
    }
    const onDelete = () => {}
    return {
      onSave,
      onDelete,
      areaList,
      addressInfo,
    }
  },
})
</script>

<style scoped lang="scss"></style>
