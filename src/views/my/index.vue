<template>
  <div class="my-container">
    <div class="user-head" @click="toUser" v-if="!user.id">
      <div class="avatar"><img src="../../assets/images/default-user.png" /></div>
      <div class="uname">登录/注册</div>
    </div>
    <div class="user-head" @click="toUser" v-else>
      <div class="avatar">
        <img :src="(user.avatar && user.avatar.url) || '../../assets/images/default-user.png'" />
      </div>
      <div class="uname">{{ user.name }}</div>
    </div>
    <div class="order-state">
      <div class="item" v-for="(item, index) in orderStates" :key="index" @click="toPath(item.to)">
        <component class="icon" :is="'van-icon'" :name="item.icon" />
        <div class="name">{{ item.label }}</div>
      </div>
    </div>
    <div class="menu-list">
      <div class="item" v-for="(item, index) in menuList" :key="index" @click="toPath(item.to)">
        <component class="icon" :is="'van-icon'" :name="item.icon" />
        <span class="tit">{{ item.title }}</span>
        <span class="arrow-right"><van-icon name="arrow" /></span>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref, computed } from "vue"
import { useStore } from "vuex"
import { useRouter } from "vue-router"
export default defineComponent({
  setup() {
    const store = useStore()
    const router = useRouter()
    const orderStates = ref([
      { label: "全部", icon: "records", to: "/my/order" },
      { label: "待付款", icon: "balance-pay", to: "/my/order?status=ordered" },
      { label: "待发货", icon: "logistics", to: "/my/order?status=paid" },
      { label: "待收货", icon: "peer-pay", to: "/my/order?status=receiving" },
      { label: "已完成", icon: "flower-o", to: "/my/order?status=completed" },
    ])
    const menuList = ref([
      { title: "收货地址", icon: "location-o", to: "/my/address" },
      { title: "我的收藏", icon: "star-o", to: "/my/fav" },
      { title: "设置", icon: "setting-o", to: "/my/setting" },
    ])
    const user = computed(() => store.state.user.user)
    const toUser = () => {
      console.log("user", user)
      const url = user.value.id ? "/my/info" : "/login"
      router.push(url)
    }
    const toPath = (to) => {
      to && router.push(to)
    }
    return {
      orderStates,
      menuList,
      user,
      toUser,
      toPath,
    }
  },
})
</script>

<style scoped lang="scss">
.user-head {
  padding: 1.3rem $padding 1.5rem $padding;
  background: $color-primary;
  color: #fff;
  .avatar {
    display: inline-block;
    vertical-align: middle;
    width: 1.6rem;
    height: 1.6rem;
    background: #fff;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      border: 0;
    }
  }
  .uname {
    display: inline-block;
    margin-left: 0.3rem;
    font-size: 0.4rem;
  }
}
.order-state {
  padding: $padding;
  margin: $margin;
  margin-top: -0.5rem;
  background: #fff;
  display: flex;
  border-radius: $radius;
  .item {
    flex: 1;
    text-align: center;
    color: #666;
    .icon {
      font-size: 0.7rem;
      margin-bottom: 0.2rem;
    }
  }
}
.menu-list {
  margin: $margin;
  .item {
    padding: $padding;
    background: #fff;
    border-bottom: 1px solid $color-border;
    position: relative;
    &:first-child {
      border-radius: $radius $radius 0 0;
    }
    &:last-child {
      border-radius: 0 0 $radius $radius;
      border-bottom: 0;
    }
    &:active {
      background: #fafafa;
    }
    .arrow-right {
      position: absolute;
      right: 0.4rem;
      top: 50%;
      transform: translateY(-50%);
      opacity: 0.5;
    }
    .icon {
      margin-right: 0.2rem;
      vertical-align: middle;
    }
  }
}
</style>
