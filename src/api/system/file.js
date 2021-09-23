import axios from "../axios"

export default {
  upload: (opt) => {
    return axios.post("/api/system/file/upload", opt)
  },
}
