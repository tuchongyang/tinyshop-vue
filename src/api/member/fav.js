import axios from "../axios"

export default {
  list: (params) => axios.get("/api/member/fav", { params }),
  save: (opt) => axios.post("/api/member/fav/save", opt),
  cancel: (opt) => axios.post("/api/member/fav/cancel", opt),
}
