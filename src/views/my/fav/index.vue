<template>
  <div class="ad-container">
    <van-pull-refresh class="list-container has-footer" v-model="refreshing" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getList">
        <div class="product-list">
          <div class="item" v-for="(item, index) in list" :key="index" @click="toProduct(item)">
            <div class="img"><img :src="item.good.thumbnailImage?.url" /></div>
            <div class="det">
              <div class="name">{{ item.good.name }}</div>
              <div class="des">{{ item.good.desc }}</div>
              <div class="price">
                ￥{{ item.good.salePrice }}<span class="del">￥{{ item.good.marketPrice }}</span>
              </div>
              <div class="btn-remove" @click="remove(item)"><van-icon name="delete" /></div>
            </div>
          </div>
        </div>
        <van-empty v-if="!list.length && !loading" />
      </van-list>
    </van-pull-refresh>
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
      api.member.fav
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
    const remove = (data) => {
      Dialog.confirm({
        title: "提示",
        message: "确认删除吗？",
      })
        .then(() => {
          // on confirm
          api.member.fav.cancel({ goodId: data.good.id }).then(() => {
            Toast.success("删除成功")
            refreshing.value = true
            onRefresh()
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
.product-list {
  display: flex;
  flex-wrap: wrap;
  padding: 0.3rem 0.1rem;
  .item {
    width: 50%;
    padding: 0 0.2rem;
    margin-bottom: 0.3rem;
    position: relative;
    .img {
      background: #ffffff;
      height: 4.6rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .det {
      padding: 0.2rem;
      background: #fff;
      .name {
        color: rgba(0, 0, 0, 0.87);
        font-size: 0.36rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-bottom: 0.1rem;
      }
      .price {
        color: #ea625b;
        line-height: 1.5em;
        font-size: 0.36rem;
        .del {
          color: #999;
          text-decoration: line-through;
          margin-left: 0.2rem;
        }
      }
    }
    .btn-remove {
      position: absolute;
      top: 0;
      right: 0.2rem;
      padding: 0.2rem;
      z-index: 5;
      font-size: 0.5rem;
      color: #ea625b;
    }
  }
}
</style>
