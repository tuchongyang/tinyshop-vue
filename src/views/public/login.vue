<template>
  <div class="container">
    <div class="head">
      <div class="logo"><img src="../../assets/images/logo.png" /></div>
      <svg
        class="waves"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
        shape-rendering="auto"
      >
        <defs>
          <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"></path>
        </defs>
        <g class="parallax">
          <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7"></use>
          <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)"></use>
          <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)"></use>
          <use xlink:href="#gentle-wave" x="48" y="7" fill="#fff"></use>
        </g>
      </svg>
      <div class="btn-back"><van-icon name="arrow-left" /></div>
    </div>
    <div class="wrapper">
      <div class="title">登 录</div>
      <div class="form">
        <div class="row">
          <van-icon class="icon" name="user-o" />
          <input class="text" v-model="form.name" placeholder="请输入用户名/邮箱/手机" />
          <div class="line"></div>
        </div>
        <div class="row">
          <van-icon class="icon" name="bag-o" />
          <input class="text" v-model="form.password" type="password" placeholder="请输入密码" />
          <div class="line"></div>
        </div>
        <div class="row">
          <div class="btn btn-login" @click="submit">登 录</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "vue"
import { Toast } from "vant"
import { useStore } from "vuex"
import { useRouter } from "vue-router"
export default {
  setup() {
    const store = useStore()
    const router = useRouter()
    const form = ref({
      name: "",
      password: "",
    })
    const submit = () => {
      if (!form.value.name) {
        return Toast("请输入用户名")
      }
      if (!form.value.password) {
        return Toast("请输入密码")
      }
      Toast.loading({
        message: "登录中...",
        forbidClick: true,
      })
      store.dispatch("user/login", { username: form.value.name, password: form.value.password }).then(() => {
        store.dispatch("user/getUserInfo", form.value).then(() => {
          Toast.success("登录成功")
          router.back()
        })
      })
    }
    return {
      form,
      submit,
    }
  },
}
</script>
<style scoped lang="scss">
.container {
  min-height: 100vh;
  background: #fff;
  .head {
    height: 5rem;
    background: $color-primary;
    position: relative;
    .btn-back {
      position: absolute;
      left: 0.3rem;
      top: 0.3rem;
      color: #fff;
      font-size: 0.6rem;
    }
    .waves {
      position: absolute;
      bottom: 0;
    }
    .logo {
      width: 1.6rem;
      height: 1.6rem;
      background: #fff;
      border-radius: 50%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 1rem;
      text-align: center;
      img {
        width: 80%;
        margin: 10%;
      }
    }
  }
  .wrapper {
    margin: 0 1.5rem;
    padding: 0.5rem 0;
    .title {
      text-align: center;
      font-weight: 700;
      margin-bottom: 0.5rem;
      color: #222;
      font-size: 0.5rem;
    }
  }
  .form {
    .row {
      margin-bottom: 0.4rem;
      position: relative;
      .text {
        width: 100%;
        height: 1.2rem;
        line-height: 1.2rem;
        padding: 0 0.3rem 0 0.7rem;
        border: none;
        border-bottom: 1px solid #ddd;
        &:focus + .line {
          transform: scaleX(1);
        }
      }
      .icon {
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        font-size: 0.6rem;
        color: #ccc;
      }
      .line {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        background: $color-primary;
        height: 2px;
        transform: scaleX(0);
        transition: all 0.3s;
      }
      .btn-login {
        display: block;
        text-align: center;
        background: $color-primary;
        color: #fff;
        height: 1rem;
        line-height: 1rem;
        margin-top: 2rem;
        border-radius: $radius;
        &:active {
          opacity: 0.9;
        }
      }
    }
  }
}
/* Animation */

.parallax > use {
  animation: move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
}
.parallax > use:nth-child(1) {
  animation-delay: -2s;
  animation-duration: 7s;
}
.parallax > use:nth-child(2) {
  animation-delay: -3s;
  animation-duration: 10s;
}
.parallax > use:nth-child(3) {
  animation-delay: -4s;
  animation-duration: 13s;
}
.parallax > use:nth-child(4) {
  animation-delay: -5s;
  animation-duration: 20s;
}
@keyframes move-forever {
  0% {
    transform: translate3d(-90px, 0, 0);
  }
  100% {
    transform: translate3d(85px, 0, 0);
  }
}
</style>
