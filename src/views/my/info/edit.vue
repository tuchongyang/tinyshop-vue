<template>
  <div class="container has-header">
    <HeaderBar :headerLeftStatus="true">
      <template v-slot:right>
      <div class="btn" >保存</div>
      </template>
    </HeaderBar>
    <div class="content">
      <input class="text" v-model="model" />
    </div>
  </div>
</template>
<script>
import {ref,computed} from "vue"
import {useRoute} from 'vue-router'
import {useStore} from 'vuex'
import HeaderBar from '@/components/Layout/HeaderBar/index.vue'
export default {
  components:{HeaderBar},
  setup() {
    const route = useRoute()
    const store = useStore()
    const key = route.query.key;
    const user = computed(()=>store.state.user.user)
    const model = ref(user.value[key])
    return {
      model
    }
  },
}
</script>
<style scoped lang="scss">
.content{
  padding: $padding;
  .text{
    border: 1px solid $color-border;
    height: 1rem;
    line-height: 1rem;
    width: 100%;
    border-radius: $radius;
    padding: 0 .2rem;
  }
}

</style>