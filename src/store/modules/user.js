import api from "@/api"
import Utils from "@/utils"

export default {
  namespaced: true,
  state: {
    token: Utils.storage.local.get("token") || "",
    user: Utils.storage.local.get("userInfo") || {},
  },
  getters: {},
  mutations: {
    SET_TOKEN: (state, value) => {
      state.token = value
      Utils.storage.local.set("token", value)
    },
    SET_USER: (state, value) => {
      state.user = value
      Utils.storage.local.set("userInfo", value)
    },
    CLEAR_USER: (state) => {
      state.token = ""
      state.user = {}
      Utils.storage.local.remove("token")
      Utils.storage.local.remove("userInfo")
    },
  },
  actions: {
    async login({ commit }, { username = "", password = "" }) {
      return api.system.user.login({ username, password }).then((res) => {
        commit("SET_TOKEN", res)
      })
    },
    async getUserInfo({ commit }, refresh) {
      let userInfo = Utils.storage.local.get("userInfo")
      if (userInfo && !refresh) {
        commit("SET_USER", userInfo)
        return
      }
      const res = await api.system.user.info()
      commit("SET_USER", res)
    },
    async logout({ commit }) {
      commit("CLEAR_USER")
    },
  },
}
