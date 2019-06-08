// 封装登陆的表单组件
<template>
  <div class="text_group">
    <div class="input_group" :class="{is_error: error}">
      <!-- 输入框 -->
      <input
        :type="type"
        :value="value"
        :placeholder="placeholder"
        :name="name"
        @input="$emit('input', $event.target.value)"
      >
      <!-- 获取验证码 -->
      <button v-if="btnTitle" :disabled="disabled" @click="$emit('btnClick')">{{ btnTitle }}</button>
    </div>
    <!-- 错误提示 -->
    <div class="invallid-feedback" v-if="error">{{ error }}</div>
  </div>
</template>

<script>
export default {
  name: "inputGroup",
  props: {
    type: {
      type: String,
      default: "text"
    },
    value: String,
    placeholder: String,
    name: String,
    btnTitle: String,
    disabled: Boolean,
    error: String
  }
};
</script>

<style lang='scss' scoped>
  .input_group {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 10px;
    &.is_error{
        border: 1px solid red;
    }
    input {
      height: 100%;
      width: 60%;
      outline: none;
      border: none;
    }
    button {
      border: none;
      outline: none;
      background-color: #fff;
      &[disabled] {
        color: #aaa;
      }
    }
  }
  .invallid-feedback {
    color: red;
    padding-top: 5px;
  }
</style>
