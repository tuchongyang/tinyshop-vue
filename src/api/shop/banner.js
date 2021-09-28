import axios from "../axios"

export default {
  list: (params) => axios.get("/api/shop/banner/list", { params }),
}
