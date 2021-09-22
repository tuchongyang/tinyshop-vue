import axios from "../axios"
export default {
  list: (params) => axios.get("/api/shop/good", { params }),
  detail: (id) => axios.get("/api/shop/good/" + id),
}
