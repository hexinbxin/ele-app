// tabbar组件
<template>
  <div class="tabbar">
    <router-link
      v-for="(val, index) in data"
      :key="`${val.title}${index}`"
      :to="val.path"
      active-class="is-seleced"
    >
      <div class="tab-val-icon">
        <span :class="`fa fa-${val.ico}`"></span>
      </div>
      <div class="tab-val-label">{{ val.title }}</div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "tabbar",
  props: {
    data: Array
  }
};
</script>

<style lang='scss' scoped>
.tabbar {
  height: 45px;
  width: 100%;
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
  background-color: #fafafa;
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  padding: 2px 0;
  a {
    height: 100%;
    text-decoration: none;
    color: #999;
    &.is-seleced {
      color: #009eef !important;
    }
    .tab-val-icon {
      width: 100%;
      margin-bottom: 8px;
      span: {
          font-size: 10px;
      }
    }
  }
}
</style>
