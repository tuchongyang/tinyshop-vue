import Utils from "@/utils"

export default {
  namespaced: true,
  state: {
    cartList: Utils.storage.local.get("cartList") || {},
  },
  getters: {},
  mutations: {
    ADD_CART: (state, value) => {
      state.cartList.push(value)
      Utils.storage.local.set("cartList", state.cartList)
    },
    REMOVE_CART: (state, cartId) => {
      const curIndex = state.cartList.findIndex((a) => a.id == cartId)
      state.cartList.splice(curIndex, 1)
      Utils.storage.local.set("cartList", state.cartList)
    },
    CLEAR_CART: (state) => {
      state.cartList = []
      Utils.storage.local.remove("cartList")
    },
  },
  actions: {
    async addCart({ commit }, cart) {
      commit("ADD_CART", cart)
    },
    async removeCart({ commit }, cartId) {
      commit("REMOVE_CART", cartId)
    },
    async clearCart({ commit }) {
      commit("CLEAR_CART")
    },
  },
}
