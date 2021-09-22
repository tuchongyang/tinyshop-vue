<template>
  <div class="container">
    <div class="head">
      <div class="avatar">
        <img :src="(user.avatar && user.avatar.url) || '../../assets/images/default-user.png'" />
      </div>
    </div>
    <div class="menu">
      <div class="item">
        <div class="tit">昵称</div>
        <div class="txt">{{ user.name }}</div>
        <div class="arrow-right"><van-icon name="arrow" /></div>
      </div>
      <div class="item" @click="toEdit('username')">
        <div class="tit">用户名</div>
        <div class="txt">{{ user.username }}</div>
        <div class="arrow-right"><van-icon name="arrow" /></div>
      </div>
      <div class="item">
        <div class="tit">邮箱</div>
        <div class="txt">{{ user.email || "无" }}</div>
        <div class="arrow-right"><van-icon name="arrow" /></div>
      </div>
      <div class="item">
        <div class="tit">电话</div>
        <div class="txt">{{ user.phone || "无" }}</div>
        <div class="arrow-right"><van-icon name="arrow" /></div>
      </div>
      <div class="item">
        <div class="tit">性别</div>
        <div class="txt">{{ user.sex == 1 ? "男" : "女" || "无" }}</div>
        <div class="arrow-right"><van-icon name="arrow" /></div>
      </div>
    </div>
  </div>
</template>
<script>
import { computed } from "vue"
import { useStore } from "vuex"
import {useRouter} from 'vue-router'
export default {
  setup() {
    const store = useStore()
    const router = useRouter()
    const user = computed(() => store.state.user.user)
    const toEdit = (key)=>{
      router.push({
        path: "/my/info/edit",
        query:{
          key
        }
      })
    }
    return {
      user,
      toEdit
    }
  },
}
</script>
<style scoped lang="scss">
.head {
  padding: 1.2rem 0;
  .avatar {
    width: 1.8rem;
    height: 1.8rem;
    border-radius: 50%;
    margin: 0 auto;
    background: #fff;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.menu {
  .item {
    padding: 0.4rem 0.8rem 0.4rem 0.4rem;
    background: #fff;
    position: relative;
    border-bottom: 1px solid $color-border;
    @include clearfix;
    &:active {
      background: #fafafa;
    }
    .tit {
      float: left;
    }
    .txt {
      float: right;
      color: #999;
    }
    .arrow-right {
      position: absolute;
      right: 0.3rem;
      top: 50%;
      transform: translateY(-50%);
      font-size: 0.4rem;
      color: #ccc;
    }
  }
}
</style>
