<template>
  <div class="container">
    <div class="address-info" @click="onAdd">
      <div class="empty" v-if="!address.id">请选择收货地址</div>
      <div class="content" v-else>
        <div class="name">
          <span>{{ address.name }}</span
          ><span>{{ address.tel }}</span>
        </div>
        <div>{{ address.addressDetail }}</div>
      </div>
      <van-icon class="arrow-left" name="location-o" />
      <van-icon class="arrow-right" name="arrow" />
    </div>
    <div class="divider"></div>
    <div class="shop-title">
      <img src="" />
      <span class="tit">店铺名称</span>
    </div>
    <div class="good-list">
      <div class="item" v-for="item in cartList" :key="item.id">
        <div class="img">
          <img :src="item.goodPic" />
        </div>
        <div class="det">
          <div class="title">{{ item.goodName }}</div>
          <div class="desc">{{ item.specName }}</div>
          <div class="price">
            ￥{{ item.salePrice }} <span class="count">x {{ item.count }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="divider"></div>
    <div class="list">
      <div class="item">
        <span class="tit">优惠券</span>
        <span class="txt">无可用优惠券</span>
      </div>
      <div class="item">
        <span class="tit">店铺优惠</span>
        <span class="txt">无</span>
      </div>
    </div>
    <div class="divider"></div>
    <div class="list">
      <div class="item">
        <span class="tit">商品金额</span>
        <span class="txt">￥{{ totalPrice }}</span>
      </div>
      <div class="item">
        <span class="tit">优惠金额</span>
        <span class="txt">0</span>
      </div>
      <div class="item">
        <span class="tit">运费</span>
        <span class="txt">免运费</span>
      </div>
      <van-field v-model="remark" label="备注" placeholder="请输入备注" />
    </div>
    <van-submit-bar class="submit-bar" :price="totalPrice * 100" button-text="提交订单" @submit="onSubmit" />
  </div>
</template>
<script>
import { ref, computed } from "vue"
import { useStore } from "vuex"
import { useRoute, useRouter } from "vue-router"
import { Toast } from "vant"
import api from "@/api"
export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const remark = ref("")
    /** 处理商品列表 */
    let cartList = ref([])
    if (route.query.cartIds) {
      cartList = computed(() => store.state.cart.cartList.filter((a) => route.query.cartIds.indexOf(a.id) > -1))
    } else if (route.query.cart) {
      cartList = ref([JSON.parse(decodeURIComponent(route.query.cart))])
    }
    /** 处理联系人 */
    const address = ref(store.state.cart.address)
    const onAdd = () => {
      router.push({
        path: "/my/address",
        query: {
          from: "order",
        },
      })
    }
    console.log("cartList.value", cartList.value)
    /** 计算价格 */
    const totalPrice = computed(() => cartList.value.reduce((next, cur) => next + cur.salePrice * cur.count, 0))
    /** 提交订单 */
    const onSubmit = () => {
      if (!address.value.id) {
        return Toast("请选择收货地址")
      }
      const opt = {
        addressId: address.value.id,
        merchantId: 1,
        remark: remark.value,
        goodList: cartList.value.map((item) => {
          return {
            id: item.goodId,
            qty: item.count,
            goodSpecId: item.specId,
          }
        }),
      }
      api.member.order.save(opt).then(() => {
        Toast.success("提交成功")
        // store.commit("cart/SET_ADDRESS", {})
        //订购成功，如果是来源购物车，则清除购物车数据
        cartList.value
          .filter((a) => a.id)
          .map((item) => {
            store.dispatch("cart/removeCart", item.id)
          })
        router.replace({
          path: "/order/success",
          query: {},
        })
      })
    }
    return {
      cartList,
      address,
      remark,
      onAdd,
      totalPrice,
      onSubmit,
    }
  },
}
</script>
<style scoped lang="scss">
.container {
  padding-bottom: 80px;
}
.divider {
  height: 0.3rem;
}
.shop-title {
  padding: 0.4rem;
  background: #fff;
  border-bottom: 1px solid $color-border;
}
.good-list {
  .item {
    border-bottom: 1px solid #eee;
    padding: 0.4rem;
    background: #fff;
    &:after {
      content: "";
      display: block;
      clear: both;
    }
    .img {
      width: 2rem;
      height: 2rem;
      background: #f4f4f4;
      float: left;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        border-radius: 5px;
      }
    }
    .det {
      margin-left: 2.4rem;
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
        .count {
          color: #666;
          font-size: 0.36rem;
          margin-left: 0.3rem;
        }
      }
    }
  }
}
.address-info {
  background: #fff;
  padding: 0.4rem 1rem;
  position: relative;
  .arrow-left {
    position: absolute;
    left: 0.4rem;
    top: 50%;
    transform: translateY(-50%);
    color: #999;
    font-size: 0.5rem;
  }
  .arrow-right {
    position: absolute;
    right: 0.4rem;
    top: 50%;
    transform: translateY(-50%);
    color: #999;
  }
  .empty {
    color: #999;
    line-height: 1rem;
  }
  .content {
    line-height: 1.5;
    .name {
      color: #444;
      font-size: 0.4rem;
      > span {
        margin-right: 0.3rem;
      }
    }
  }
  &::before {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 2px;
    background: -webkit-repeating-linear-gradient(
      135deg,
      #ff6c6c 0,
      #ff6c6c 20%,
      transparent 0,
      transparent 25%,
      #1989fa 0,
      #1989fa 45%,
      transparent 0,
      transparent 50%
    );
    background: repeating-linear-gradient(
      -45deg,
      #ff6c6c 0,
      #ff6c6c 20%,
      transparent 0,
      transparent 25%,
      #1989fa 0,
      #1989fa 45%,
      transparent 0,
      transparent 50%
    );
    background-size: 80px;
    content: "";
  }
}
.submit-bar {
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
}
</style>
