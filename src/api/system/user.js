import axios from "../axios"
export default {
  login: (opt) => axios.post("/api/system/user/login", opt),
  regist: (opt) => axios.post("/api/system/user/regist", opt),
  info: () => axios.get("/api/system/user/info"),
  update: (opt) => axios.post("/api/system/user/update", opt),
}
