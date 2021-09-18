<template>
  <div class="ad-container has-footer">
    <van-form @submit="onSubmit">
      <van-field
        v-model="form.name"
        name="收件人"
        label="收件人"
        placeholder="请输入收件人姓名"
        :rules="[{ required: true, message: '请输入收件人姓名' }]"
      />
      <van-field
        v-model="form.phone"
        name="电话"
        label="电话"
        placeholder="请输入收件人电话"
        :rules="[{ required: true, message: '请输入收件人电话' }]"
      />
      <van-field
        v-model="form.phone"
        name="地址"
        label="地址"
        placeholder="请输入收件人地址"
        :rules="[{ required: true, message: '请输入收件人地址' }]"
      />
      <van-field name="switch" label="默认">
        <template #input>
          <van-switch v-model="form.isDefault" size="20" />
        </template>
      </van-field>

      <div class="fix-footer padding">
        <van-button type="primary" block native-type="submit">确 定</van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue"

export default defineComponent({
  setup() {
    const form = ref({
      name: "",
      phone: "",
      address: "",
      isDefault: false,
    })
    const onSubmit = (values) => {
      console.log(values)
    }
    return {
      form,
      onSubmit,
    }
  },
})
</script>

<style scoped lang="scss"></style>
