<template>
  <div class="rst-activity">
    <div class="activity-txt">
      <span :style="{backgroundColor: `#${activities[0].icon_color}`}">{{ activities[0].icon_name }}</span>
      <span>{{ activities[0].description }}</span>
    </div>
    <div class="activity-count" @click="show=true">
      <span>{{ activities.length }}个优惠</span>
      <i class="fa fa-caret-down"></i>
    </div>
    <transition name="fade">
      <div class="act-model" v-if="show">
        <div class="activity-sheet">
          <i class="fa fa-remove" @click="show=false"></i>
          <h3>优惠活动</h3>
          <ul>
            <li v-for="(val, index) in activities" :key="index">
              <span :style="{backgroundColor: `#${val.icon_color}`}">{{ val.icon_name }}</span>
              <span>{{ val.description }}</span>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    activities: Array
  },
  data () {
      return {
          show: false
      }
  }
};
</script>

<style lang="scss" scoped>
.rst-activity {
  display: flex;
  color: #333;
  margin: 3.2vw auto 0;
  align-items: center;
  font-size: 0.7rem;
  width: 80vw;
  .activity-txt {
    flex: 1;
    overflow: hidden;
    span {
      &:first-child {
        color: #fff;
        height: 4.466667vw;
        line-height: 3.466667vw;
        font-size: 0.6rem;
        padding: 0.533333vw 1.2vw;
        margin-right: 1.6vw;
        display: inline-block;
        box-sizing: border-box;
        border-radius: 0.266667vw;
      }
    }
  }
  .activity-count {
    width: 16.266667vw;
    flex-shrink: 0;
    padding-right: 2.933333vw;
    text-align: right;
    color: #999;
    span {
      margin-right: 1vw;
    }
  }
  .act-model {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: rgba(0, 0, 0, 0.5);
    z-index: 99;
    .activity-sheet {
      position: absolute;
      background-color: #f5f5f5;
      box-shadow: 0 -1px 5px 0 rgba(0, 0, 0, 0.4);
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 100;
      padding: 5.333333vw 6.933333vw;
      box-sizing: border-box;
      .fa-remove {
        position: absolute;
        font-size: 1.4rem;
        right: 2.666667vw;
        top: 2.666667vw;
        z-index: 1002;
        color: #888;
      }
      h3 {
        text-align: center;
        font-size: 1.1rem;
        font-weight: 600;
        margin-bottom: 4.133333vw;
      }
      ul {
        height: 50.8vw;
        overflow-y: scroll;
        list-style: none;
        padding-left: 0;
        li {
          margin-bottom: 3.066667vw;
          display: flex;
          font-size: 0.82rem;
          align-items: center;
          span {
            &:first-child {
              height: 4.266667vw;
              padding: 0.533333vw 1.6vw;
              margin-right: 1.6vw;
              display: inline-block;
              box-sizing: border-box;
              border-radius: 0.266667vw;
              color: #fff;
              white-space: nowrap;
            }
            &:last-child {
              line-height: 1.38;
              flex: 1;
            }
          }
        }
      }
    }
  }
}
.fade-enter,.fade-leave-to{
    opacity: 0;
}
.fade-enter-active,.fade-leave-active{
    transition: opacity 0.5s;
}
.fade-enter-to, .fade-leave{
    opacity: 1;
}
</style>
