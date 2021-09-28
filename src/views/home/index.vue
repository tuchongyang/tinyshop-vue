<template>
  <div>
    <van-pull-refresh class="list-container has-footer" v-model="refreshing" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getList">
        <van-swipe @change="onChange" class="swiper">
          <van-swipe-item v-for="(item, index) in swipes" :key="index"
            ><img :src="item.image && item.image.url"
          /></van-swipe-item>
          <template #indicator>
            <div class="custom-indicator">{{ current + 1 }}/{{ swipes.length }}</div>
          </template>
        </van-swipe>
        <div class="home-title">热销爆款</div>
        <div class="product-list">
          <div class="item" v-for="(item, index) in list" :key="index" @click="toProduct(item)">
            <div class="img"><img :src="item.thumbnailImage?.url" /></div>
            <div class="det">
              <div class="name">{{ item.name }}</div>
              <div class="des">{{ item.desc }}</div>
              <div class="price">
                ￥{{ item.salePrice }}<span class="del">￥{{ item.marketPrice }}</span>
              </div>
            </div>
          </div>
        </div>
        <van-empty v-if="!list.length && !loading" />
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import { useRouter } from "vue-router"
import { useSwiperHook, useProductHook } from "./useHomeHook"

export default {
  components: {},
  setup() {
    const router = useRouter()
    const { current, onChange, swipes } = useSwiperHook()
    const { list, loading, finished, refreshing, loadData, onRefresh } = useProductHook()
    const toProduct = (data) => {
      router.push({
        path: "/product/detail",
        query: {
          id: data.id,
        },
      })
    }
    return {
      current,
      onChange,
      swipes,
      list,
      toProduct,
      loadData,
      loading,
      finished,
      refreshing,
      onRefresh,
    }
  },
}
</script>
<style lang="scss" scoped>
.custom-indicator {
  position: absolute;
  right: 5px;
  bottom: 5px;
  padding: 2px 5px;
  font-size: 12px;
  background: rgba(0, 0, 0, 0.1);
}
.swiper {
  height: 6rem;
  img {
    max-width: 100%;
  }
}
.home-title {
  padding: 0.3rem 0.3rem;
  font-size: 0.36rem;
}
.product-list {
  display: flex;
  flex-wrap: wrap;
  padding: 0 0.1rem;
  .item {
    width: 50%;
    padding: 0 0.2rem;
    margin-bottom: 0.3rem;
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
      .des {
        color: #999;
        font-size: 0.3rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
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
  }
}
</style>
