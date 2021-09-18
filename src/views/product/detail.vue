<template>
  <div class="p-container">
    <van-swipe :autoplay="3000" class="swiper">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <div class="item"><img :src="image.img" /></div>
      </van-swipe-item>
    </van-swipe>
    <div class="pro-head">
      <div class="title">长袖白色T恤长袖白色T恤长袖白色T恤长袖白色T恤长袖白色T恤</div>
      <div class="price"><b>￥3445</b><span class="del">￥332</span></div>
      <div class="stat"><span>销量：0</span><span>库存：0</span><span>浏览量：0</span></div>
    </div>
    <div class="pro-info"></div>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue"

export default defineComponent({
  setup() {
    const images = ref([
      { img: "https://img01.yzcdn.cn/vant/apple-1.jpg" },
      { img: "https://img01.yzcdn.cn/vant/apple-2.jpg" },
    ])
    return {
      images,
    }
  },
})
</script>
<style scoped lang="scss">
.swiper {
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
