<template>
  <div class="ad-container has-footer">
    <div class="address-list">
      <div class="item" v-for="(item, index) in list" :key="index">
        <div class="name"><span class="tag-default" v-if="item.isDefault">默认</span>{{ item.address }}</div>
        <div class="desc">
          <span>{{ item.name }}</span
          ><span>{{ item.phone }}</span>
        </div>
        <div class="control">
          <div class="btn" @click="toEdit"><van-icon name="edit" /></div>
          <div class="btn"><van-icon name="delete-o" /></div>
        </div>
      </div>
    </div>
    <div class="fix-footer padding">
      <van-button type="primary" block>添加地址</van-button>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue"
import { useRouter } from "vue-router"

export default defineComponent({
  setup() {
    const router = useRouter()
    const list = ref([
      {
        address: "湖北省武汉市东湖新技术开发区高新大道光谷企业中心",
        name: "张三",
        phone: "187444422222",
        isDefault: true,
      },
      { address: "湖北省武汉市东湖新技术开发区高新大道光谷企业中心", name: "张三", phone: "187444422222" },
      { address: "湖北省武汉市东湖新技术开发区高新大道光谷企业中心", name: "张三", phone: "187444422222" },
      { address: "湖北省武汉市东湖新技术开发区高新大道光谷企业中心", name: "张三", phone: "187444422222" },
      { address: "湖北省武汉市东湖新技术开发区高新大道光谷企业中心", name: "张三", phone: "187444422222" },
      { address: "湖北省武汉市东湖新技术开发区高新大道光谷企业中心", name: "张三", phone: "187444422222" },
      { address: "湖北省武汉市东湖新技术开发区高新大道光谷企业中心", name: "张三", phone: "187444422222" },
      { address: "湖北省武汉市东湖新技术开发区高新大道光谷企业中心", name: "张三", phone: "187444422222" },
      { address: "湖北省武汉市东湖新技术开发区高新大道光谷企业中心", name: "张三", phone: "187444422222" },
      { address: "湖北省武汉市东湖新技术开发区高新大道光谷企业中心", name: "张三", phone: "187444422222" },
      { address: "湖北省武汉市东湖新技术开发区高新大道光谷企业中心", name: "张三", phone: "187444422222" },
      { address: "湖北省武汉市东湖新技术开发区高新大道光谷企业中心", name: "张三", phone: "187444422222" },
      { address: "湖北省武汉市东湖新技术开发区高新大道光谷企业中心", name: "张三", phone: "187444422222" },
      { address: "湖北省武汉市东湖新技术开发区高新大道光谷企业中心", name: "张三", phone: "187444422222" },
      { address: "湖北省武汉市东湖新技术开发区高新大道光谷企业中心", name: "张三", phone: "187444422222" },
      { address: "湖北省武汉市东湖新技术开发区高新大道光谷企业中心", name: "张三", phone: "187444422222" },
      { address: "湖北省武汉市东湖新技术开发区高新大道光谷企业中心", name: "张三", phone: "187444422222" },
      { address: "湖北省武汉市东湖新技术开发区高新大道光谷企业中心", name: "张三", phone: "187444422222" },
      { address: "湖北省武汉市东湖新技术开发区高新大道光谷企业中心", name: "张三", phone: "187444422222" },
      { address: "湖北省武汉市东湖新技术开发区高新大道光谷企业中心", name: "张三", phone: "187444422222" },
      { address: "湖北省武汉市东湖新技术开发区高新大道光谷企业中心", name: "张三", phone: "187444422222" },
      { address: "湖北省武汉市东湖新技术开发区高新大道光谷企业中心", name: "张三", phone: "187444422222" },
      { address: "湖北省武汉市东湖新技术开发区高新大道光谷企业中心", name: "张三", phone: "187444422222" },
      { address: "湖北省武汉市东湖新技术开发区高新大道光谷企业中心", name: "张三", phone: "187444422222" },
      { address: "湖北省武汉市东湖新技术开发区高新大道光谷企业中心", name: "张三", phone: "187444422222" },
      { address: "湖北省武汉市东湖新技术开发区高新大道光谷企业中心", name: "张三", phone: "187444422222" },
      { address: "湖北省武汉市东湖新技术开发区高新大道光谷企业中心", name: "张三", phone: "187444422222" },
      { address: "湖北省武汉市东湖新技术开发区高新大道光谷企业中心", name: "张三", phone: "187444422222" },
      { address: "湖北省武汉市东湖新技术开发区高新大道光谷企业中心", name: "张三", phone: "187444422222" },
      { address: "湖北省武汉市东湖新技术开发区高新大道光谷企业中心", name: "张三", phone: "187444422222" },
      { address: "湖北省武汉市东湖新技术开发区高新大道光谷企业中心", name: "张三", phone: "187444422222" },
      { address: "湖北省武汉市东湖新技术开发区高新大道光谷企业中心", name: "张三", phone: "187444422222" },
      { address: "湖北省武汉市东湖新技术开发区高新大道光谷企业中心", name: "张三", phone: "187444422222" },
    ])
    const toEdit = () => {
      router.push("/my/address/edit?id=2")
    }
    return {
      list,
      toEdit,
    }
  },
})
</script>

<style scoped lang="scss">
.address-list {
  .item {
    background: #fff;
    border-bottom: 1px solid $color-border;
    padding: $padding;
    position: relative;
    .name {
      margin-bottom: 0.2rem;
    }
    .desc {
      color: $color-gray;
      > span {
        margin-right: 0.3rem;
      }
    }
    .tag-default {
      border: 1px solid red;
      color: red;
      padding: 0 5px;
      font-size: 0.3rem;
      border-radius: 2px;
      margin-right: 0.1rem;
    }
    .control {
      position: absolute;
      right: $padding;
      bottom: 0;
      .btn {
        display: inline-block;
        padding: 0.2rem 0.2rem;
      }
    }
  }
}
</style>
