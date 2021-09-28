<template>
  <div class="cart-bar">
    <div class="item" @click="routeTo('/')">
      <van-icon class="icon" name="shop-o" />
      <span class="txt">首页</span>
    </div>
    <div class="item" @click="routeTo('/cart')">
      <van-icon class="icon" name="shopping-cart-o" />
      <span class="txt">购物车</span>
    </div>
    <div class="item" v-if="!good.isFav" @click="fav">
      <van-icon class="icon" name="star-o" />
      <span class="txt">收藏</span>
    </div>
    <div class="item active" v-else @click="cancelfav">
      <van-icon class="icon" name="star" />
      <span class="txt">已收藏</span>
    </div>

    <div class="item">
      <div class="btn btn-cart" @click="open({ type: 'cart' })">加入购物车</div>
    </div>
    <div class="item">
      <div class="btn btn-buy" @click="open({ type: 'buy' })">立即购买</div>
    </div>
  </div>
  <div class="spec-dialog" :class="{ open: visible }">
    <div class="head">
      <div class="img"><img :src="good.thumbnailImage && good.thumbnailImage.url" /></div>
      <div class="price">￥{{ currentSpec.salePrice }}</div>
      <div class="det">库存：{{ currentSpec.stock }}</div>
      <div class="det">已选：{{ currentSpec.name }}</div>
      <van-icon class="btn-close" name="close" @click="close" />
    </div>
    <div class="attr-list">
      <div class="tit">规格</div>
      <div class="item-list">
        <div
          v-for="(item, childIndex) in good.specs"
          :key="childIndex"
          class="txt"
          :class="{ selected: currentSpec.id == item.id }"
          @click="selectSpec(item)"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
    <div class="attr-list">
      <div class="tit">数量</div>
      <van-stepper v-model="count" theme="round" button-size="22" disable-input />
    </div>
    <div class="foot">
      <div class="btn" :class="'btn-' + type" @click="toCarOrBuy">{{ type == "cart" ? "加入购物车" : "立即购买" }}</div>
    </div>
  </div>
  <div class="spec-dialog-cover" :class="{ open: visible }" @click="close"></div>
</template>
<script>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useStore } from "vuex"
import { Toast } from "vant"
import Utils from "@/utils"
import api from "@/api"
export default {
  props: {
    good: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  setup(props, context) {
    const router = useRouter()
    const store = useStore()
    const currentSpec = ref({})
    const count = ref(1)
    const visible = ref(false)
    const selectSpec = (data) => {
      currentSpec.value = data
      context.emit("change", currentSpec.value)
    }

    const type = ref("cart")
    const open = (opt) => {
      visible.value = true
      type.value = (opt && opt.type) || "cart"
      if (!currentSpec.value.id) {
        selectSpec(props.good.specs[0])
      }
    }
    const close = () => {
      visible.value = false
    }
    const routeTo = (url) => {
      router.push(url)
    }
    const tocart = () => {
      const cart = {
        id: Utils.uuid(),
        goodName: props.good.name,
        goodId: props.good.id,
        goodPic: props.good.thumbnailImage?.url,
        salePrice: currentSpec.value.salePrice,
        marketPrice: currentSpec.value.marketPrice,
        specId: currentSpec.value.id,
        specName: currentSpec.value.name,
        count: count.value,
        isCheck: true,
      }
      console.log("eee")
      store.dispatch("cart/addCart", cart).then(() => {
        Toast.success("添加购物车成功")
        close()
      })
    }
    const tobuy = () => {
      const cart = {
        id: Utils.uuid(),
        goodName: props.good.name,
        goodId: props.good.id,
        goodPic: props.good.thumbnailImage?.url,
        salePrice: currentSpec.value.salePrice,
        marketPrice: currentSpec.value.marketPrice,
        specId: currentSpec.value.id,
        specName: currentSpec.value.name,
        count: count.value,
      }
      router.push({
        path: "/order",
        query: {
          cart: encodeURIComponent(JSON.stringify(cart)),
        },
      })
    }
    const toCarOrBuy = () => {
      type.value == "cart" ? tocart() : tobuy()
    }

    const fav = () => {
      api.member.fav.save({ goodId: props.good.id }).then(() => {
        Toast.success("收藏成功")
        const good = props.good
        good.isFav = true
      })
    }
    const cancelfav = () => {
      api.member.fav.cancel({ goodId: props.good.id }).then(() => {
        Toast.success("取消成功")
        const good = props.good
        good.isFav = false
      })
    }
    return {
      currentSpec,
      selectSpec,
      count,
      open,
      type,
      visible,
      close,
      routeTo,
      toCarOrBuy,
      fav,
      cancelfav,
    }
  },
}
</script>
<style scoped lang="scss">
.cart-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  background: #fff;
  width: 100%;
  z-index: 90;
  display: flex;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.05);
  .item {
    flex: 1;
    line-height: 1.2;
    padding: 0.15rem 0;
    text-align: center;
    white-space: nowrap;
    &.active {
      color: $color-primary;
    }
    .icon {
      font-size: 0.6rem;
    }
    .txt {
      display: block;
      font-size: 0.34rem;
    }
    .btn {
      line-height: 1rem;
      color: #fff;
      padding: 0 0.3rem;
      margin-top: 0.05rem;
      &.btn-cart {
        background: #ff9600;
        border-radius: 1.2rem 0 0 1.2rem;
      }
      &.btn-buy {
        background: #ff4600;
        border-radius: 0 1.2rem 1.2rem 0;
        margin-right: 0.1rem;
      }
    }
  }
}
.spec-dialog {
  background: #fff;
  position: fixed;
  width: 100%;
  z-index: 200;
  bottom: 0;
  opacity: 0;
  visibility: hidden;
  transform: translateY(100%);
  transition: all 0.3s;
  &.open {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  .head {
    position: relative;
    padding: 0.4rem;
    @include clearfix;
    .img {
      float: left;
      width: 2.4rem;
      height: 2.4rem;
      margin-top: -0.8rem;
      border: 3px solid #fff;
      border-radius: $radius;
      background: #fff;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .price {
      margin-left: 2.6rem;
      font-size: 0.4rem;
      color: #ff9600;
      margin-bottom: 0.1rem;
    }
    .det {
      margin-left: 2.6rem;
      line-height: 1.4;
    }
    .btn-close {
      position: absolute;
      right: 0.3rem;
      top: 0.3rem;
      font-size: 0.6rem;
      opacity: 0.5;
      &:active {
        opacity: 0.9;
      }
    }
  }
}
.spec-dialog-cover {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.3);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s;
  &.open {
    opacity: 1;
    visibility: visible;
  }
}
.attr-list {
  display: flex;
  flex-direction: column;
  padding: 0 0.4rem 0.4rem;
  .tit {
    margin-bottom: 0.3rem;
  }
}
.item-list {
  display: flex;
  flex-wrap: wrap;
  .txt {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #eee;
    margin-right: 0.2rem;
    margin-bottom: 0.2rem;
    border-radius: 0.6rem;
    min-width: 1.5rem;
    height: 0.8rem;
    padding: 0 0.3rem;
  }
  .selected {
    background: #fbebee;
    color: $color-primary;
  }
}
.foot {
  padding: 0.4rem;
  .btn {
    display: block;
    text-align: center;
    line-height: 1rem;
    color: #fff;
    border-radius: $radius;
    &:active {
      opacity: 0.8;
    }
    &.btn-cart {
      background: #ff9600;
    }
    &.btn-buy {
      background: #ff4600;
    }
  }
}
</style>
