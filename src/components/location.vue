// 展示当前定位组件
<template>
  <div id="content">
    <div class="title">当前定位</div>
    <!-- 定位信息 -->
    <div class="des" @click="$emit('click', address)">
      <i class="fa fa-location-arrow"></i>
      <span>{{ address }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    address: String
  }
};
</script>

<style lang="scss" scoped>
#content {
  padding-top: 5px;
  .des {
    margin-top: 5px;
    i {
      color: #009eef;
    }
    span {
      color: #333;
      font-weight: bold;
      margin-left: 5px;
      display: inline-block;
      width: 90%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
</style>
