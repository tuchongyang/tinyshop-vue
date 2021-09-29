<template>
  <div class="ad-container">
    <van-pull-refresh class="list-container has-footer" v-model="refreshing" @refresh="onRefresh">
      <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="getList">
        <div class="address-list">
          <div class="item" v-for="(item, index) in list" :key="index" @click="select(item)">
            <div class="name">
              <span class="tag-default" v-if="item.isDefault">默认</span
              >{{ item.province + item.city + item.county + item.addressDetail }}
            </div>
            <div class="desc">
              <span>{{ item.name }}</span
              ><span>{{ item.tel }}</span>
            </div>
            <div class="control">
              <div class="btn" @click="toEdit(item.id)"><van-icon name="edit" /></div>
              <div class="btn" @click="remove(item, index)"><van-icon name="delete-o" /></div>
            </div>
          </div>
        </div>
        <van-empty v-if="!list.length && !loading" />
      </van-list>
    </van-pull-refresh>
    <div class="fix-footer padding">
      <van-button type="warning" block @click="toEdit()">添加地址</van-button>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue"
import { useStore } from "vuex"
import { useRouter } from "vue-router"
import api from "@/api"
import { Dialog, Toast } from "vant"

export default defineComponent({
  setup() {
    const store = useStore()
    const router = useRouter()
    const loading = ref(false)
    const finished = ref(false)
    const refreshing = ref(false)
    const params = ref({
      page: 0,
      pageSize: 10,
    })
    const list = ref([])
    const getList = () => {
      if (finished.value) {
        return
      }
      params.value.page++
      loading.value = true
      api.member.address
        .list(params.value)
        .then((res) => {
          if (refreshing.value) {
            list.value = []
          }
          list.value = list.value.concat(res.rows)
          if (list.value.length >= res.count) {
            finished.value = true
          }
        })
        .finally(() => {
          loading.value = false
          refreshing.value = false
        })
    }
    const onRefresh = () => {
      params.value.page = 0
      finished.value = false
      getList()
    }
    const toEdit = (id) => {
      router.push("/my/address/edit?id=" + id)
    }
    //删除
    const remove = (data, index) => {
      Dialog.confirm({
        title: "提示",
        message: "确认删除该地址吗？",
      })
        .then(() => {
          // on confirm
          api.member.address.remove(data.id).then(() => {
            Toast.success("删除成功")
            list.value.splice(index, 1)
          })
        })
        .catch(() => {
          // on cancel
        })
    }
    //选择
    const select = (data) => {
      store.commit("cart/SET_ADDRESS", data)
      router.back()
    }
    return {
      list,
      toEdit,
      getList,
      loading,
      finished,
      refreshing,
      onRefresh,
      remove,
      select,
    }
  },
})
</script>

<style scoped lang="scss">
.ad-container {
  .list-container {
    min-height: 100vh;
  }
}
.address-list {
  .item {
    background: #fff;
    border-bottom: 1px solid $color-border;
    padding: $padding;
    position: relative;
    .name {
      margin-bottom: 0.2rem;
      line-height: 1.4;
    }
    .desc {
      color: $color-gray;
      > span {
        margin-right: 0.3rem;
      }
    }
    .tag-default {
      border: 1px solid red;
      color: red;
      padding: 0 5px;
      font-size: 0.3rem;
      border-radius: 2px;
      margin-right: 0.1rem;
    }
    .control {
      position: absolute;
      right: $padding;
      bottom: 0;
      .btn {
        display: inline-block;
        padding: 0.2rem 0.2rem;
      }
    }
  }
}
</style>
