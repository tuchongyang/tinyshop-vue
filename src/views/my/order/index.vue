<template>
  <div class="ad-container">
    <van-tabs v-model:active="params.status" @click="onTabChange" :sticky="true" :swipeable="true">
      <van-tab :title="item.label" v-for="item in statusTabs" :key="item.value" :name="item.value"></van-tab>
    </van-tabs>
    <van-pull-refresh class="list-container has-footer" v-model="refreshing" @refresh="onRefresh">
      <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="getList">
        <div class="order-list">
          <div class="order-item" v-for="(item, index) in list" :key="index" @click="toDetail(item.id)">
            <div class="head">
              <div class="status" v-html="getStatus(item.status)"></div>
              <div class="time">{{ item.createdAt }}</div>
            </div>
            <div class="good-list">
              <div class="item" v-for="good in item.goodList" :key="good.id">
                <div class="img">
                  <img :src="good.goodPic" />
                </div>
                <div class="det">
                  <div class="title">{{ good.goodName }}</div>
                  <div class="desc">{{ good.goodSpecName }}</div>
                  <div class="price">
                    ￥{{ good.salePrice }} <span class="count">x {{ good.qty }}</span>
                  </div>
                </div>
              </div>
            </div>
            <!-- <div class="good-tip">共{{ item.goodsTotalQty }}件商品，实付款：￥{{ item.totalAmount }}</div> -->
            <div class="control" v-if="['canceled'].indexOf(item.status) <= -1">
              <van-button
                plain
                type="default"
                size="small"
                @click.stop="cancelOrder(item)"
                v-if="['canceled'].indexOf(item.status) <= -1"
                >取消订单</van-button
              >
              <van-button
                plain
                type="warning"
                size="small"
                @click.stop="payOrder(item)"
                v-if="['ordered'].indexOf(item.status) > -1"
                >立即支付</van-button
              >
            </div>
          </div>
        </div>
        <van-empty description="" v-if="!list.length && !loading" />
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue"
import { useRouter, useRoute } from "vue-router"
import api from "@/api"
import { Dialog, Toast } from "vant"

export default defineComponent({
  setup() {
    const route = useRoute()
    const router = useRouter()
    const loading = ref(false)
    const finished = ref(false)
    const refreshing = ref(false)
    const params = ref({
      page: 0,
      pageSize: 10,
      status: route.query.status || "",
    })
    const list = ref([])
    const getList = () => {
      console.log("finished", finished)
      if (finished.value) {
        return
      }
      params.value.page++
      api.member.order
        .list(params.value)
        .then((res) => {
          if (refreshing.value) {
            list.value = []
          }
          list.value = list.value.concat(res.rows)
          console.log(list.value.length, res.count)
          // if (list.value.length >= res.count) {
          finished.value = true
          // }
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
    const toDetail = (id) => {
      router.push("/my/order/detail?id=" + id)
    }
    //取消订单
    const cancelOrder = (data) => {
      Dialog.confirm({
        title: "提示",
        message: "确认取消该订单吗？",
      })
        .then(() => {
          // on confirm
          api.member.order.cancel(data.id).then(() => {
            Toast.success("取消成功")
            refreshing.value = true
            onRefresh()
          })
        })
        .catch(() => {
          // on cancel
        })
    }
    //支付订单
    const payOrder = (data) => {
      Dialog.confirm({
        title: "提示",
        message: "确认支付该订单吗？",
      })
        .then(() => {
          // on confirm
          api.member.order.pay(data.id).then(() => {
            Toast.success("支付成功")
            refreshing.value = true
            onRefresh()
          })
        })
        .catch(() => {
          // on cancel
        })
    }

    //状态tab
    const statusTabs = ref([
      { label: "全部", value: "" },
      { label: "待付款", value: "ordered" },
      { label: "待发货", value: "paid" },
      { label: "待收货", value: "receiving" },
      { label: "已完成", value: "completed" },
      { label: "已取消", value: "canceled" },
    ])
    const onTabChange = (name) => {
      params.value.status = name
      refreshing.value = true
      onRefresh()
    }
    const getStatus = (val) => {
      const map = [
        { value: "ordered", label: "待付款", color: "#ff9600" },
        { value: "paid", label: "待发货", color: "#ff9600" },
        { value: "receiving", label: "待收货", color: "#ff9600" },
        { value: "completed", label: "已完成", color: "#00be0a" },
        { value: "canceled", label: "已取消", color: "#999" },
      ]
      const cur = map.find((a) => a.value == val)
      return (cur && `<span style="color: ${cur.color}">${cur.label}</span>`) || val
    }
    return {
      list,
      params,
      toDetail,
      getList,
      loading,
      finished,
      refreshing,
      onRefresh,
      cancelOrder,
      statusTabs,
      onTabChange,
      getStatus,
      payOrder,
    }
  },
})
</script>

<style scoped lang="scss">
.ad-container {
  .list-container {
    min-height: calc(100vh - 50px);
  }
}
.order-list {
  .order-item {
    background: #fff;
    border-bottom: 1px solid $color-border;
    padding: $padding;
    position: relative;
    margin-top: 0.2rem;
    .head {
      border-bottom: 1px solid $color-border;
      padding: 0 0 0.2rem;
      @include clearfix;
      .status {
        float: right;
      }
    }
    .good-list {
      .item {
        border-bottom: 1px solid #eee;
        padding: 0.4rem 0;
        background: #fff;
        &:after {
          content: "";
          display: block;
          clear: both;
        }
        &:last-child {
          border: 0;
          padding-bottom: 0;
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
    .good-tip {
      text-align: right;
      margin-top: -0.6rem;
    }
    .control {
      margin-top: 0.3rem;
      padding-top: 0.2rem;
      text-align: right;
      border-top: 1px solid $color-border;
      .van-button {
        margin-left: 0.2rem;
      }
    }
  }
}
</style>
