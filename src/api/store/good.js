import axios from "../axios"
export default {
  list: (params) => axios.get("/api/store/good", { params }),
  detail: (id) => axios.get("/api/store/good/" + id),
}
