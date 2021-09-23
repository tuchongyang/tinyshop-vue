<template>
  <div class="container has-header">
    <HeaderBar :headerLeftStatus="true" :title="'修改' + currentSchema.label">
      <template v-slot:right>
        <div class="btn" @click="save">保存</div>
      </template>
    </HeaderBar>
    <div class="content">
      <component
        :class="currentSchema.type"
        v-model="model"
        :is="componentMap[currentSchema.type]"
        :schema="currentSchema"
      />
    </div>
  </div>
</template>
<script>
import { ref, computed } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useStore } from "vuex"
import HeaderBar from "@/components/Layout/HeaderBar/index.vue"
import api from "@/api"
import schema from "./schema"
import UInput from "./components/u-input.vue"
import USelect from "./components/u-select.vue"
import { Toast } from "vant"
export default {
  components: { HeaderBar, USelect, UInput },
  setup() {
    const route = useRoute()
    const store = useStore()
    const router = useRouter()
    const key = route.query.key
    const user = computed(() => store.state.user.user)
    const model = ref(user.value[key])
    //当前编辑的那条数据的schema模型
    const currentSchema = schema.find((a) => a.prop == key)
    //schema中的type与实际渲染的组件名一一对应
    const componentMap = {
      input: "u-input",
      select: "u-select",
    }
    const save = () => {
      const opt = {}
      opt[key] = model.value
      api.system.user.update(opt).then(() => {
        Toast("修改成功")
        store.dispatch("user/getUserInfo", true).then(() => {
          router.back()
        })
      })
    }
    return {
      model,
      currentSchema,
      componentMap,
      save,
    }
  },
}
</script>
<style scoped lang="scss">
.content {
  padding: $padding;
  .input {
    border: 1px solid $color-border;
    height: 1rem;
    line-height: 1rem;
    width: 100%;
    border-radius: $radius;
    padding: 0 0.2rem;
  }
}
</style>
