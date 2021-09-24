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
    <div class="pro-info">
      <div class="list">
        <div class="item" @click="selectSpec">
          <span class="tit">规格</span>
          <span class="txt">{{ currentSpec.name }}</span>
          <span class="arrow-right"><van-icon name="arrow" /></span>
        </div>
        <div class="item">
          <span class="tit">服务</span>
          <span class="txt">7天无理由退换货 · 假一赔十</span>
        </div>
      </div>
    </div>
    <div class="rate-info">
      <div class="head">评价(0)</div>
    </div>
    <div class="desc-info">
      <div class="title">图文详情</div>
      <div class="body" v-html="good.content"></div>
      <van-empty description="数据空空的" v-if="!good.content && !loading" />
      <div class="foot">已经到底了</div>
    </div>
    <CartBar ref="cartBarRef" :good="good" @change="onSepcChange" />
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
    const loading = ref(false)
    const getData = () => {
      const id = route.query.id
      loading.value = true
      api.shop.good
        .detail(id)
        .then((res) => {
          good.value = res
        })
        .finally(() => {
          loading.value = false
        })
    }
    const stock = computed(() => (good.value.specs && good.value.specs.reduce((next, cur) => next + cur.stock, 0)) || 0)

    const cartBarRef = ref(null)
    const selectSpec = () => {
      cartBarRef.value.open()
    }
    const currentSpec = ref({})
    const onSepcChange = (spec) => {
      currentSpec.value = spec
    }

    getData()
    return {
      good,
      stock,
      cartBarRef,
      loading,
      selectSpec,
      onSepcChange,
      currentSpec,
    }
  },
})
</script>
<style scoped lang="scss">
.p-container {
  padding-bottom: 1.6rem;
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
.pro-info {
  margin: 0.3rem 0;
  .list {
    .item {
      background: #fff;
    }
  }
}
.rate-info {
  background: #fff;
  margin: 0.3rem 0;
  padding: 0.4rem;
}
.desc-info {
  margin-top: 0.3rem;
  background: #fff;
  .title {
    text-align: center;
    padding: 0.2rem 0;
    &:before,
    &:after {
      content: "";
      width: 1rem;
      height: 1px;
      background: #ddd;
      display: inline-block;
      vertical-align: middle;
      margin: 0 0.3rem;
    }
  }
  .foot {
    font-size: 0.3rem;
    text-align: center;
    padding: 0.2rem 0;
  }
}
</style>
