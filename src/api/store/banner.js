import axios from "../axios"

export default {
  list: (params) => axios.get("/api/store/banner/list", { params }),
}
