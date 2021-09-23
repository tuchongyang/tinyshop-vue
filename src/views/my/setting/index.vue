<template>
  <!-- <div class="list">
    <div class="item" v-for="item in list" :key="item.prop" @click="toEdit(item.prop)">
      <div class="tit">{{ item.label }}</div>
      <div class="txt">{{ getValue(item) }}</div>
      <div class="arrow-right"><van-icon name="arrow" /></div>
    </div>
  </div> -->
  <div class="btn-block btn-logout" @click="logout">退出登录</div>
</template>
<script>
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
    return { logout }
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
