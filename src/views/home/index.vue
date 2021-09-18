<template>
  <div>
    <van-swipe @change="onChange" class="swiper">
      <van-swipe-item v-for="(item, index) in swipes" :key="index"><img :src="item.src" /></van-swipe-item>
      <template #indicator>
        <div class="custom-indicator">{{ current + 1 }}/{{ swipes.length }}</div>
      </template>
    </van-swipe>
    <div class="home-menu">
      <div
        class="item"
        v-for="(item, index) in menus"
        :key="index"
        :style="{ 'background-image': 'url(' + item.src + ')' }"
      ></div>
    </div>
    <div class="home-title">热销爆款</div>
    <div class="product-list">
      <div class="item" v-for="(item, index) in products" :key="index">
        <div class="img"><img :src="item.src" /></div>
        <div class="det">
          <div class="name">{{ item.name }}</div>
          <div class="des">{{ item.desc }}</div>
          <div class="price">{{ item.price }}<span class="s">起</span></div>
          <div class="btn-buy">立即购买</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "vue"

/**轮播图逻辑 */
const swperEffect = () => {
  const current = ref(0)
  const onChange = (index) => {
    current.value = index
  }
  const swipes = ref([
    { src: "//cdn.cnbj1.fds.api.mi-img.com/mi-mall/0721f0bed43776a72e9189592f87db13.jpg?thumb=1&w=720&h=360" },
    { src: "//cdn.cnbj1.fds.api.mi-img.com/mi-mall/49b95c70d02787af059708d61e8c2582.jpg?thumb=1&w=720&h=360" },
  ])
  return {
    current,
    onChange,
    swipes,
  }
}

/**菜单逻辑 */
const menuEffect = () => {
  const menus = ref([
    { src: "/static/images/menu-1.png" },
    { src: "/static/images/menu-2.webp" },
    { src: "/static/images/menu-3.webp" },
    { src: "/static/images/menu-4.webp" },
    { src: "/static/images/menu-5.webp" },
    { src: "/static/images/menu-6.webp" },
    { src: "/static/images/menu-7.png" },
    { src: "/static/images/menu-8.png" },
    { src: "/static/images/menu-9.webp" },
    { src: "/static/images/menu-10.png" },
  ])
  return {
    menus,
  }
}
/**商品列表 */
const productEffect = () => {
  const products = ref([
    {
      src: "//cdn.cnbj1.fds.api.mi-img.com/mi-mall/b849e46756af7c95002aa3906ed77c13.jpg?thumb=1&w=344&h=280",
      name: "小米11",
      desc: "1.12''GN2｜骁龙888",
      price: 4999,
    },
    {
      src: "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/94b22bbff9fa84440a0aed48f9f63154.jpg?thumb=1&w=344&h=280",
      name: "MIX FOLD 小米折叠屏手机",
      desc: "折叠大屏｜自研芯片",
      price: 9999,
    },
    {
      src: "//cdn.cnbj1.fds.api.mi-img.com/mi-mall/6dca45286d9d76d1f864a8ecf77f5600.jpg?thumb=1&w=344&h=280",
      name: "Note 9 5G",
      desc: "天玑 800U处理器，5000mAh电池",
      price: 1299,
    },
    {
      src: "//cdn.cnbj1.fds.api.mi-img.com/mi-mall/455c8ad8d204e4ffd67865a98ae40c7b.jpg?thumb=1&w=344&h=280",
      name: "小米10S",
      desc: "骁龙870 | 对称式双扬立体声",
      price: 3299,
    },
  ])
  return {
    products,
  }
}
export default {
  components: {},
  setup() {
    const { current, onChange, swipes } = swperEffect()
    const { menus } = menuEffect()
    const { products } = productEffect()
    return {
      current,
      onChange,
      swipes,
      menus,
      products,
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
  img {
    max-width: 100%;
  }
}
.home-menu {
  display: flex;
  flex-wrap: wrap;
  .item {
    width: 20%;
    padding-bottom: 20%;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
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
      background: #f5f5f5;
      img {
        width: 100%;
      }
    }
    .det {
      text-align: center;
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
      }
      .btn-buy {
        display: inline-block;
        width: 2rem;
        background: #ea625b;
        border-radius: 0.05rem;
        text-align: center;
        color: #fff;
        font-size: 0.24rem;
        padding: 0.16rem 0;
        font-weight: 700;
      }
    }
  }
}
</style>
