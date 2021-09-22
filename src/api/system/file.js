import axios from "../axios"

export default {
  upload: (opt) => {
    axios.post("/api/system/file/upload", opt)
  },
}
