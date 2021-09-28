<template>
  <div class="list">
    <div class="item" v-for="(item, index) in menuList" :key="index" @click="toPath(item.to)">
      <component class="icon" :is="'van-icon'" :name="item.icon" />
      <span class="tit">{{ item.title }}</span>
      <span class="arrow-right"><van-icon name="arrow" /></span>
    </div>
  </div>
  <div class="btn-block btn-logout" @click="logout">退出登录</div>
</template>
<script>
import { ref } from "vue"
import { useStore } from "vuex"
import { useRouter } from "vue-router"
export default {
  setup() {
    const store = useStore()
    const router = useRouter()
    const logout = () => {
      store.dispatch("user/logout").then(() => {
        router.back()
      })
    }

    const menuList = ref([{ title: "个人资料", icon: "setting-o", to: "/my/info" }])

    const toPath = (to) => {
      to && router.push(to)
    }
    return { logout, menuList, toPath }
  },
}
</script>
<style scoped lang="scss">
.btn-block {
  display: block;
  line-height: 1rem;
  text-align: center;
  background: #fff;
  border-radius: $radius;
  margin: 0 0.4rem;
  &:active {
    background: #fafafa;
  }
}
.btn-logout {
  margin-top: 1rem;
}
</style>
