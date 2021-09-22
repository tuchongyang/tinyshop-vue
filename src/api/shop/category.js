import axios from "../axios"

export default {
  list: (params) => axios.get("/api/shop/category", { params }),
  tree: (params) => axios.get("/api/shop/category/tree", { params }),
  save: (opt) => axios.post("/api/shop/category/save", opt),
  remove: (id) => axios.delete("/api/shop/category/" + id),
}
