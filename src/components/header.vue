// 定位组件的头部
<template>
  <div class="header">
    <div class="header-button is-Left" v-show="isLeft">
      <i class="fa fa-chevron-left"></i>
      <button @click="$router.go(-1)">返回</button>
    </div>
    <h4 class="header-title">{{ title }}</h4>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    isLeft: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang='scss' scoped>
.header {
  background-color: #009eef;
  box-sizing: border-box;
  color: #fff;
  display: flex;
  align-items: center;
  font-size: 16px;
  height: 45px;
  line-height: 1;
  padding: 0 10px;
  text-align: center;
  white-space: nowrap;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 99;
  .header-button {
    &.is-leaft {
      text-align: left;
    }
    button {
      background-color: transparent;
      border: 0;
      box-shadow: none;
      color: inherit;
      display: inline-block;
      padding: 0;
      font-size: inherit;
      outline: none;
    }
  }
  .header-title {
    flex: 1;
  }
}
</style>
