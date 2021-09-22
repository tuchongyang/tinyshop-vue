class IStorage {
  constructor(storage) {
    if (Object.prototype.toString.call(storage) === "[object Storage]") {
      this._storage = storage
    }
  }
  set(key, value) {
    this._storage.setItem(key, typeof value === "string" ? value : JSON.stringify(value))
  }
  get(key) {
    let value = this._storage.getItem(key)
    try {
      value = JSON.parse(value)
    } catch (e) {
      value = value + ""
    }
    return value
  }
  isEmpty() {
    return !!this._storage.length
  }
  has(key) {
    return !!this._storage.getItem(key)
  }
  remove(key) {
    this._storage.removeItem(key)
  }
  clear() {
    // 清除数据时，若存在用户名则仍然保留
    const username = this._storage.getItem("username")
    this._storage.clear()
    if (username) {
      this._storage.setItem("username", username)
    }
  }
}

export default {
  local: new IStorage(localStorage),
  session: new IStorage(sessionStorage),
}
