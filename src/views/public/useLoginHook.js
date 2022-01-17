import { ref } from "vue"
import { Toast } from "vant"
import { useStore } from "vuex"
import { useRouter } from "vue-router"
export function useLoginHook() {
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
    store.dispatch("user/login", { name: form.value.name, password: form.value.password }).then(() => {
      store.dispatch("user/getUserInfo", form.value).then(() => {
        Toast.success("登录成功")
        router.back()
      })
    })
  }
  const toback = () => {
    router.back()
  }
  return {
    form,
    submit,
    toback,
  }
}
import api from "@/api"
export function useRegistHook(state) {
  const form = ref({
    name: "",
    username: "",
    email: "",
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
      message: "提交中...",
      forbidClick: true,
    })
    api.system.user.regist(form.value).then(() => {
      Toast.success("注册成功")
      state.value = "login"
    })
  }
  return {
    form,
    submit,
  }
}
