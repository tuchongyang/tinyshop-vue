<template>
  <div class="container" :class="classObj">
    <!-- <header-bar></header-bar> -->
    <router-view />
    <footer-bar :menulist="menulist"></footer-bar>
  </div>
</template>
<script>
// import HeaderBar from '@/components/Layout/HeaderBar'
import FooterBar from "@/components/Layout/FooterBar"
import { ref, computed, watch } from "vue"
import { useRoute } from "vue-router"

const footMenuEffect = () => {
  const menulist = ref([])
  menulist.value = [
    {
      name: "首页",
      path: "/",
      iconPath: require("@/assets/images/tab-1.png"),
      selectIconPath: require("@/assets/images/tab-1-cur.png"),
    },
    {
      name: "分类",
      path: "/category",
      iconPath: require("@/assets/images/tab-2.png"),
      selectIconPath: require("@/assets/images/tab-2-cur.png"),
    },
    // {name: '星球',path:'/star',iconPath: require('@/assets/images/tab-3.png'),selectIconPath: require('@/assets/images/tab-3-cur.png')},
    {
      name: "购物车",
      path: "/cart",
      iconPath: require("@/assets/images/tab-4.png"),
      selectIconPath: require("@/assets/images/tab-4-cur.png"),
    },
    {
      name: "我的",
      path: "/my",
      iconPath: require("@/assets/images/tab-5.png"),
      selectIconPath: require("@/assets/images/tab-5-cur.png"),
    },
  ]
  const route = useRoute()
  const showFooter = ref(menulist.value.some((a) => a.path == route.path) ? true : false)
  watch(
    () => route && route.path,
    (newVal, oldVal) => {
      console.log("new", oldVal, newVal)
      showFooter.value = menulist.value.some((a) => a.path == newVal) ? true : false
    }
  )
  return { menulist, showFooter }
}

export default {
  components: { FooterBar },
  setup() {
    const { menulist, showFooter } = footMenuEffect()

    const classObj = computed(() => {
      return [
        showFooter.value ? "has-footer" : "",
        // 'has-header'
      ]
    })
    return {
      menulist,
      showFooter,
      classObj,
    }
  },
}
</script>
<style scoped lang="scss">
.container {
  .footer-bar {
    display: none;
  }
  &.has-footer {
    padding-bottom: 1.6rem;
    .footer-bar {
      display: block;
    }
  }
  &.has-header {
    padding-top: 1.6rem;
    padding-top: 1.2rem;
  }
}
</style>
