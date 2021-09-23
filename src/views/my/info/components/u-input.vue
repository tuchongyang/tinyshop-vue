<template>
  <input type="text" v-model="model" :placeholder="'请输入' + schema.label" />
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
      type: String,
      default: "",
    },
  },
  setup(props, context) {
    const model = ref(props.modelValue)
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
    }
  },
}
</script>
<style scoped lang="scss"></style>
