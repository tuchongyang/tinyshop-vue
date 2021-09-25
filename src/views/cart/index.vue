<template>
  <div class="cart-container">
    <div class="cart-list">
      <div class="item" v-for="item in cartList" :key="item.id">
        <div class="img">
          <img :src="item.goodPic" />
          <div class="check" :class="{ active: item.isCheck }" @click="toggleCheck(item)">
            <van-icon name="success" />
          </div>
        </div>
        <div class="det">
          <div class="title">{{ item.goodName }}</div>
          <div class="desc">{{ item.specName }}</div>
          <div class="price">￥{{ item.salePrice }}</div>
          <div class="num"><van-stepper v-model="item.count" /></div>
          <div class="btn-del" @click="remove(item)"><van-icon name="delete-o" /></div>
        </div>
      </div>
    </div>
    <van-empty description="数据空空的" v-if="!cartList.length" />
    <div class="cart-footer" v-if="cartList.length">
      <van-button
        class="btn-submit"
        round
        color="linear-gradient(to right, #ff6034, #ee0a24)"
        size="small"
        @click="submit"
        >去结算</van-button
      >
      <div class="price">￥{{ totalPrice }}</div>
    </div>
  </div>
</template>
<script>
import { computed } from "vue"
import { useStore } from "vuex"
import { Toast } from "vant"
import { useRouter } from "vue-router"
export default {
  setup() {
    const store = useStore()
    const router = useRouter()
    const cartList = computed(() => store.state.cart.cartList)
    const remove = (cart) => {
      store.dispatch("cart/removeCart", cart.id).then(() => {
        Toast.success("删除成功")
      })
    }
    const toggleCheck = (data) => {
      data.isCheck = !data.isCheck
    }
    //结算金额
    const totalPrice = computed(() => {
      return cartList.value.filter((a) => a.isCheck).reduce((next, cur) => next + cur.salePrice * cur.count, 0)
    })
    const submit = () => {
      router.push({
        path: "/order",
        query: {
          cartIds: cartList.value
            .filter((a) => a.isCheck)
            .map((a) => a.id)
            .join(","),
        },
      })
    }
    return {
      cartList,
      remove,
      toggleCheck,
      totalPrice,
      submit,
    }
  },
}
</script>
<style scoped lang="scss">
.cart-container {
  padding-bottom: 50px;
}
.cart-list {
  .item {
    border-bottom: 1px solid #eee;
    padding: 0.4rem;
    background: #fff;
    position: relative;
    &:after {
      content: "";
      display: block;
      clear: both;
    }
    .img {
      width: 2.4rem;
      height: 2.4rem;
      background: #f4f4f4;
      float: left;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        border-radius: 5px;
      }
      .check {
        position: absolute;
        top: -0.2rem;
        left: -0.2rem;
        background: #fff;
        border-radius: 50%;
        color: #fff;
        width: 0.7rem;
        height: 0.7rem;
        line-height: 0.6rem;
        text-align: center;
        border: 3px solid #fff;
        border: 1px solid #ff9600;
        i {
          vertical-align: middle;
        }
        &.active {
          background: #ff9600;
        }
      }
    }
    .det {
      margin-left: 2.8rem;
      margin-right: 0.4rem;
      .title {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        margin-bottom: 0.1rem;
        font-size: 0.4rem;
      }
      .desc {
        color: #999;
        margin-bottom: 0.1rem;
      }
      .price {
        margin-bottom: 0.1rem;
        font-size: 0.4rem;
        color: #ff9600;
      }
      .btn-del {
        position: absolute;
        top: 0.4rem;
        right: 0.3rem;
        color: #999;
      }
    }
  }
}
.cart-footer {
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 1.4rem;
  padding: 0.2rem 0.4rem;
  overflow: hidden;
  background: #fff;
  .btn-submit {
    float: right;
    padding-left: 20px;
    padding-right: 20px;
  }
  .price {
    float: right;
    line-height: 30px;
    margin-right: 0.2rem;
  }
}
</style>
