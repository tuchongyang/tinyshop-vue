<template>
  <div class="my-container">
    <div class="user-head">
      <div class="avatar"><img src="../../assets/images/default-user.png" /></div>
      <div class="uname">登录/注册</div>
    </div>
    <div class="order-state">
      <div class="item" v-for="(item, index) in orderStates" :key="index">
        <component class="icon" :is="'van-icon'" :name="item.icon" />
        <div class="name">{{ item.label }}</div>
      </div>
    </div>
    <div class="menu-list">
      <div class="item" v-for="(item, index) in menuList" :key="index">
        <component class="icon" :is="'van-icon'" :name="item.icon" />
        <span class="tit">{{ item.title }}</span>
        <span class="arrow-right"><van-icon name="arrow" /></span>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue"
export default defineComponent({
  setup() {
    const orderStates = ref([
      { label: "全部", icon: "records" },
      { label: "待付款", icon: "balance-pay" },
      { label: "待发货", icon: "logistics" },
      { label: "待收货", icon: "peer-pay" },
      { label: "待评价", icon: "flower-o" },
    ])
    const menuList = ref([
      { title: "收货地址", icon: "location-o" },
      { title: "我的收藏", icon: "star-o" },
      { title: "设置", icon: "setting-o" },
    ])
    return {
      orderStates,
      menuList,
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
      font-size: 20px;
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
