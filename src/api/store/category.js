import axios from "../axios"

export default {
  list: (params) => axios.get("/api/store/category", { params }),
  tree: (params) => axios.get("/api/store/category/tree", { params }),
  save: (opt) => axios.post("/api/store/category/save", opt),
  remove: (id) => axios.delete("/api/store/category/" + id),
}
