<template>
  <div class="u-select">
    <div class="item" v-for="item in schema.options" @click="select(item.value)" :key="item.value">
      {{ item.label }}
      <van-icon class="right" v-if="model == item.value" name="success" />
    </div>
  </div>
</template>
<script>
import { ref, watch } from "vue"
export default {
  props: {
    schema: {
      type: Object,
      default() {
        return {}
      },
    },
    modelValue: {
      type: Number || String,
      default: null,
    },
  },
  setup(props, context) {
    const model = ref(props.modelValue)
    const select = (val) => {
      model.value = val
    }
    watch(model, (val) => {
      context.emit("update:modelValue", val)
    })
    watch(
      () => props.modelValue,
      (val) => {
        model.value = val
      }
    )
    return {
      model,
      select,
    }
  },
}
</script>
<style scoped lang="scss">
.u-select {
  .item {
    background: #fff;
    padding: 0.4rem;
    border-bottom: 1px solid $color-border;
    position: relative;
    &:active {
      background: #fafafa;
    }
    .right {
      position: absolute;
      right: 0.4rem;
      font-size: 0.4rem;
    }
  }
}
</style>
