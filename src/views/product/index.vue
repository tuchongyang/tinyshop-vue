<template>
  <div class="p-container">
    <div class="header">
      <div class="header-left" @click="$router.back()">
        <van-icon name="arrow-left" />
      </div>
      <div class="header-in">
        <input class="txt" placeholder="请输入商品名称搜索" />
      </div>
      <div class="header-right"></div>
    </div>
    <van-pull-refresh class="list-container has-footer" v-model="refreshing" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getList">
        <div class="product-list grid">
          <div class="item" v-for="(item, index) in list" :key="index" @click="toProduct(item)">
            <div class="inner">
              <div class="img">
                <img class="image" :src="item.thumbnailImage && item.thumbnailImage.url" />
              </div>
              <div class="det">
                <div class="title">
                  <a href="javascript:;"> {{ item.name }}</a>
                </div>
                <div>
                  <div class="tag red">
                    <!-- {{ item.tagNames[0].tagName }} -->
                  </div>
                </div>
                <div class="head">
                  <span class="price">
                    <b>￥{{ item.salePrice }}</b>
                    <span class="del">￥{{ item.marketPrice }}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue"
import { useRouter } from "vue-router"
import api from "@/api"
export default defineComponent({
  components: {},
  setup() {
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
      api.shop.good
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
        .catch((e) => {
          console.log("e", e)
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
    const toProduct = (data) => {
      router.push({
        path: "/product/detail",
        query: {
          id: data.id,
        },
      })
    }

    return {
      list,
      refreshing,
      loading,
      finished,
      onRefresh,
      getList,
      toProduct,
    }
  },
})
</script>
<style scoped lang="scss">
.p-container {
  padding-top: 1.2rem;
}
.header {
  width: 100%;
  height: 1.2rem;
  background: #fff;
  position: fixed;
  z-index: 1;
  display: flex;
  top: 0;
  left: 0;
  .header-left {
    width: 10%;
    height: 100%;

    i {
      font-size: 0.6rem;
      line-height: 1.2rem;
      text-align: center;
      display: block;
    }
  }

  .header-in {
    width: 100%;
    height: 100%;
    line-height: 1;
    text-align: center;
    font-size: 0.4rem;
    display: block;
    padding: 0.15rem 0.3rem;
    .txt {
      width: 100%;
      line-height: 0.8rem;
      border-radius: 0.8rem;
      border: 1px solid $color-border;
      padding: 0 0.4rem 0 0.4rem;
      font-size: 0.34rem;
    }
  }

  .header-right {
    width: 10%;
    height: 100%;
  }
}
.product-list {
  &.grid {
    margin: 0;
    @include clearfix;
    .item {
      margin: 0;
      padding: 0;
      width: 50%;
      float: left;
      background: #fff;
      .inner {
        padding: $padding-sm;
      }
      .det {
        padding: 5px 0;
      }
      .img {
        width: 100%;
        padding-bottom: 100%;
        position: relative;
        background: $color-bg;
        img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      }
      .title {
        margin-bottom: 0.1rem;
      }
      .price {
        line-height: 1;
        .label {
          font-size: 12px;
        }
        b {
          color: #d43030;
        }

        .del {
          color: #999;
          text-decoration: line-through;
          line-height: 1.4;
          font-size: 12px;
          font-weight: normal;
          margin-left: 0.2rem;
        }
      }
    }
  }
}
</style>
