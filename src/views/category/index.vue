<template>
  <div class="category-container">
    <div class="category-left">
      <ul>
        <li
          :class="{ active: currentId == item.id }"
          v-for="item in categoryTree"
          :key="item.id"
          @click="select(item.id)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
    <div class="category-main">
      <template v-for="(item, index) in current.children" :key="index">
        <div class="title">{{ item.name }}</div>
        <ul class="cate-list">
          <li v-for="(sub, i) in item.children" :key="i" @click="toProduct(sub)">
            <div class="img">
              <img :src="sub.image && sub.image.url" />
            </div>
            <div class="name">{{ sub.name }}</div>
          </li>
        </ul>
      </template>
    </div>
  </div>
</template>
<script>
import { ref, computed } from "vue"
import { useRouter } from "vue-router"
import api from "@/api"
export default {
  setup() {
    const router = useRouter()
    const categoryTree = ref([])
    const currentId = ref("")
    const getData = () => {
      api.shop.category.tree({ merchantId: 1 }).then((res) => {
        categoryTree.value = res.filter((a) => a.children && a.children.length)
        currentId.value = res[0].id
      })
    }
    getData()
    //当前选中的一级分类
    const current = computed(() => categoryTree.value.find((a) => a.id == currentId.value) || { children: [] })
    //左侧一级分类选择
    const select = (id) => {
      currentId.value = id
    }
    //点击分类，跳转商品列表
    const toProduct = (data) => {
      router.push({
        path: "/product",
        query: {
          categoryId: data.id,
          categoryName: data.name,
        },
      })
    }
    return {
      currentId,
      categoryTree,
      current,
      select,
      toProduct,
    }
  },
}
</script>
<style scoped lang="scss">
.category-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 1.4rem;
}
.category-left {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 2.6rem;
  background: #fff;
  overflow: auto;
  li {
    padding: 0.4rem;
    border-bottom: 1px solid #eee;
    color: #606060;
    position: relative;
    &.active {
      background: #f8f8f8;
      color: #ff9600;
      &:before {
        content: "";
        display: inline-block;
        width: 4px;
        height: 0.5rem;
        background: #ff9600;
        position: absolute;
        left: 0;
        top: 50%;
        margin-top: -0.25rem;
        border-radius: 0 3px 3px 0;
      }
    }
  }
}
.category-main {
  background: #f8f8f8;
  margin-left: 2.6rem;
  padding-left: 0.4rem;
  position: relative;
  height: 100%;
  overflow: auto;
  .title {
    padding: 0.3rem 0;
  }
  .cate-list {
    background: #fff;
    padding-bottom: 0.3rem;
    li {
      width: 33.33333%;
      float: left;
      text-align: center;
      .img {
        width: 100%;
        padding-bottom: 100%;
        position: relative;
        img {
          position: absolute;
          width: 100%;
          height: 100%;
          left: 0;
          top: 0;
        }
      }
      .name {
        color: #666;
      }
    }
    &:after {
      content: "";
      display: block;
      clear: both;
    }
  }
}
</style>
