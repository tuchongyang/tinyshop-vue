import { createStore } from "vuex"
import user from "./modules/user"
import cart from "./modules/cart"

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    cart,
  },
})
