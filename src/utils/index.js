import storage from "./storage"

function uuid(length = 6){
    return Number(Math.random().toString().substr(3,length) + Date.now()).toString(36);
}
export default { storage, uuid }
