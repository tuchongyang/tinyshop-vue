<template>
  <div class="container">
    <div class="head">
      <van-uploader :after-read="afterRead">
        <div class="avatar">
          <img :src="(user.avatar && user.avatar.url) || '../../assets/images/default-user.png'" />
        </div>
      </van-uploader>
    </div>
    <div class="menu">
      <div class="item" v-for="item in schema" :key="item.prop" @click="toEdit(item.prop)">
        <div class="tit">{{ item.label }}</div>
        <div class="txt">{{ getValue(item) }}</div>
        <div class="arrow-right"><van-icon name="arrow" /></div>
      </div>
    </div>
  </div>
</template>
<script>
import { computed } from "vue"
import { useStore } from "vuex"
import { useRouter } from "vue-router"
import schema from "./schema"
import api from "@/api"
import { Toast } from "vant"
export default {
  setup() {
    const store = useStore()
    const router = useRouter()
    const user = computed(() => store.state.user.user)
    const toEdit = (key) => {
      router.push({
        path: "/my/info/edit",
        query: {
          key,
        },
      })
    }
    const getValue = (data) => {
      let val = user.value[data.prop]
      let result = val
      if (data.type == "select") {
        const cur = data.options.find((a) => a.value == val)
        result = (cur && cur.label) || val
      }
      return result || "无"
    }
    //头像上传
    const afterRead = (file) => {
      console.log("file", file)
      const formData = new FormData()
      formData.append("file", file.file)
      Toast.loading({
        message: "上传中...",
        forbidClick: true,
      })
      api.system.file.upload(formData).then((res) => {
        console.log("res", res)
        api.system.user.update({ avatarId: res.id }).then(() => {
          Toast("修改成功")
          store.dispatch("user/getUserInfo", true).then(() => {})
        })
      })
    }
    return {
      user,
      toEdit,
      schema,
      getValue,
      afterRead,
    }
  },
}
</script>
<style scoped lang="scss">
.head {
  padding: 1.2rem 0;
  text-align: center;
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
