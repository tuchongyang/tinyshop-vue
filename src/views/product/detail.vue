<template>
  <div class="p-container">
    <van-swipe :autoplay="false" class="swiper">
      <van-swipe-item v-for="(image, index) in good.images" :key="index">
        <div class="item"><img :src="image.url" /></div>
      </van-swipe-item>
    </van-swipe>
    <div class="pro-head">
      <div class="title">{{ good.name }}</div>
      <div class="price">
        <b>￥{{ good.salePrice }}</b
        ><span class="del">￥{{ good.marketPrice }}</span>
      </div>
      <div class="stat">
        <span>销量：{{ good.sales }}</span
        ><span>库存：{{ stock }}</span
        ><span>浏览量：0</span>
      </div>
    </div>
    <div class="pro-info"></div>
    <CartBar ref="cartBarRef" :good="good" />
  </div>
</template>
<script>
import { defineComponent, ref, computed } from "vue"
import api from "@/api"
import { useRoute } from "vue-router"
import CartBar from "./components/cart-bar.vue"
export default defineComponent({
  components: { CartBar },
  setup() {
    const route = useRoute()
    const good = ref({ images: [], specs: [] })
    const getData = () => {
      const id = route.query.id
      api.shop.good.detail(id).then((res) => {
        good.value = res
      })
    }
    const stock = computed(() => (good.value.specs && good.value.specs.reduce((next, cur) => next + cur.stock, 0)) || 0)

    const cartBarRef = ref(null)

    getData()
    return {
      good,
      stock,
      cartBarRef,
    }
  },
})
</script>
<style scoped lang="scss">
.p-container {
  padding-bottom: 1rem;
  overflow: hidden;
}
.swiper {
  height: 10rem;
  .item {
    width: 100%;
    padding-bottom: 100%;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      position: absolute;
    }
  }
}
.pro-head {
  background: #fff;
  padding: $padding;
  .title {
    color: #444;
    font-size: 0.4rem;
    margin-bottom: 0.2rem;
  }
  .price {
    margin-bottom: 0.2rem;
    font-size: 0.4rem;
    b {
      font-size: 0.5rem;
      color: $color-price;
    }
    .del {
      color: $color-gray;
      text-decoration: line-through;
      margin-left: 0.2rem;
    }
  }
  .stat {
    display: flex;
    justify-content: space-between;
    color: $color-gray;
  }
}
</style>
