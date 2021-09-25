<template>
  <div class="containter">
    <div class="head">
      <van-icon class="icon" name="passed" />
      <div class="txt">订单提交成功</div>
    </div>
    <div class="control">
      <div class="btn" @click="routeTo('/')">返回首页</div>
      <div class="btn" @click="routeTo('/order')">查看订单</div>
    </div>
  </div>
</template>
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
  .btn {
    display: inline-block;
    width: 4rem;
    text-align: center;
    line-height: 1rem;
    border: 1px solid $color-primary;
  }
}
</style>
