import axios from "../axios"

export default {
  list: (params) => axios.get("/api/member/order", { params }),
  save: (opt) => axios.post("/api/member/order/save", opt),
  remove: (id) => axios.delete("/api/member/order/" + id),
  cancel: (id) => axios.post("/api/member/order/cancel/" + id),
  pay: (id) => axios.post("/api/member/order/pay/" + id),
}
