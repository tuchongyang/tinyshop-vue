<template>
  <div class="containter">
    <div class="head">
      <van-icon class="icon" name="passed" />
      <div class="txt">订单提交成功</div>
    </div>
    <div class="control">
      <div class="btn" @click="routeTo('/')">返回首页</div>
      <div class="btn btn-primary" @click="routeTo('/my/order')">查看订单</div>
    </div>
  </div>
</template>
<script>
import { useRouter } from "vue-router"
export default {
  setup() {
    const router = useRouter()
    const routeTo = (path) => {
      router.push(path)
    }
    return {
      routeTo,
    }
  },
}
</script>

<style scoped lang="scss">
.head {
  padding: 0.4rem;
  text-align: center;
  .icon {
    font-size: 2rem;
    color: #33ca59;
  }
}
.control {
  margin-top: 1rem;
  text-align: center;
  .btn {
    display: inline-block;
    width: 3rem;
    text-align: center;
    line-height: 0.8rem;
    margin: 0 0.2rem;
    border: 1px solid $color-primary;
  }
  .btn-primary {
    background: $color-primary;
    color: #fff;
  }
}
</style>
