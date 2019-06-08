<template>
  <div :class="{open: isSort || isScreen}" @click.self="hide">
    <div class="filter-wrap" v-if="filterDate">
      <aside class="filter">
        <div
          class="filter-nav"
          v-for="(val, index) in filterDate.navTab"
          :key="val.name + index"
          :class="{bold: index==currentFilter}"
          @click="filterSort(index)"
        >
          <span>{{ val.name }}</span>
          <i :class="`fa fa-${val.icon}`" v-if="val.icon"></i>
        </div>
      </aside>
    </div>
    <!-- 排序 -->
    <section class="filter-extend" v-if="isSort">
      <ul>
        <li v-for="(val, index) in filterDate.sortBy" :key="index" @click="selectSor(val, index)">
          <span :class="{selectName: index == currentSort}">{{ val.name }}</span>
          <i :class="`fa ${index == currentSort? 'fa-check' : ''}`"></i>
        </li>
      </ul>
    </section>
    <!-- 筛选 -->
    <section class="filter-extend" v-if="isScreen">
      <div class="filter-sort">
        <div class="morefilter" v-for="(screen, index) in filterDate.screenBy" :key="index">
          <p class="title">{{ screen.title }}</p>
          <ul>
            <li v-for="(val, i) in screen.data" :key="val.name+i" :class="{selected: val.select}" @click="selectScreen(val, screen)">
              <img v-if="val.icon" :src="val.icon" alt>
              <span>{{ val.name }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="btn">
        <span class="clear" :class="{edit: edit}" @click="clear">清空</span>
        <span class="determine" @click="filterOK">确定</span>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Filters",
  props: {
    filterDate: Object
  },
  data() {
    return {
      currentFilter: 0,
      isSort: false,
      currentSort: 0,
      isScreen: false
    };
  },
  methods: {
    filterSort(index) {
      this.currentFilter = index;
      if (index == 0) {
        this.isSort = true;
        this.$emit("searchFixed", true);
      } else if (index != 3) {
        this.$emit("updata", this.filterDate.navTab[index].condition);
        this.hide();
      } else if (index == 3) {
        this.isScreen = true;
        this.isSort = false;
        this.$emit("searchFixed", true);
      }
    },
    hide() {
      this.isSort = false;
      this.$emit("searchFixed", false);
    },
    selectSor(val, index) {
      this.currentSort = index;
      this.filterDate.navTab[0].name = val.name;
      this.hide();
      // 将排序规则传给父级
      this.$emit("updata", val.code);
      // console.log(val)
    },
    selectScreen (son, father) {
        // 单选
        if(father.id !== "MPI") {
            father.data.forEach(val => {
                val.select = false;
            });
            son.select = !son.select;
        }else {
            son.select = !son.select;
        }
    },
    clear () {
        this.filterDate.screenBy.forEach(screen => {
            screen.data.forEach(val => {
                val.select = false;
            })
        })
    },
    filterOK () {
        let MPIStr = '';
        let screenDate = {
            MPI: '',
            offer: '',
            per: ''
        }
        this.filterDate.screenBy.forEach(screen => {
            screen.data.forEach(val => {
                if(val.select == true) {
                    if(screen.id !== "MPI"){
                        // 单选
                        screenDate[screen.id] = val.code
                    }else{
                        // 多选
                        MPIStr += `${val.code},`
                        screenDate[screen.id] = MPIStr
                    }
                }
            })
        })
        // console.log(MPIStr)
        this.$emit("updata", screenDate);
        this.isScreen = false;
        this.hide();
    }
  },
  computed: {
      edit () {
          let edit = false
        this.filterDate.screenBy.forEach(screen => {
            screen.data.forEach(val => {
                if(val.select == true) {
                    edit = true
                }
            })
        })
        return edit;
      }
  }
};
</script>

<style lang="scss" scoped>
.open {
  position: fixed;
  top: 55px;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: all 0.3 ease-in-out;
  z-index: 10;
}
.filter-wrap {
  background-color: #fff;
  position: static;
  top: 54px;
  z-index: 100;
  .filter {
    position: relative;
    border-bottom: 1px solid #ddd;
    z-index: 101;
    height: 10.666667vw;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .filter-nav {
    flex: 1;
    text-align: center;
    color: #666;
    font-size: 0.8333rem;
    &.bold {
      font-weight: bold;
    }
    i {
      width: 1.6vw;
      height: 0.8vw;
      margin-left: 1.333333vw;
      margin-bottom: 0.533333vw;
    }
  }
}
.filter-extend {
  background-color: #fff;
  color: #333;
  padding-top: 2.133333vw;
  position: absolute;
  width: 100%;
  z-index: 4;
  left: 0;
  // top: 24.533333vw;
  li {
    position: relative;
    padding-left: 5.333333vw;
    line-height: 10.666667vw;
    overflow: hidden;
    &.selected {
      color: #3190e8 !important;
      background-color: #edf5ff !important;
    }

    .selectName {
      color: #009eef;
    }
    .fa-check {
      float: right;
      color: #009eef;
      margin-right: 3.733333vw;
      line-height: 10.666667vw;
    }
  }
}
.filter-sort {
  background: #fff;
  padding: 0 2.666667vw;
  line-height: normal;
  .morefilter {
    margin: 2.666667vw 0;
    overflow: hidden;
    .title {
      margin-bottom: 2vw;
      color: #666;
      font-size: 0.5rem;
    }
    ul {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      font-size: 0.8rem;
      li {
        box-sizing: border-box;
        width: 30%;
        height: 9.333333vw;
        line-height: 9.333333vw;
        margin: 0.8vw 1%;
        background: #fafafa;
        img {
          width: 3.466667vw;
          height: 3.466667vw;
          vertical-align: middle;
          margin-right: 0.8vw;
        }
        span {
          margin-left: 2%;
          vertical-align: middle;
        }
      }
    }
  }
}
.btn {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #fafafa;
  box-shadow: 0 -0.266667vw 0.533333vw 0 #ededed;
  line-height: 11.466667vw;
  box-sizing: border-box;
  span {
    font-size: 0.826667rem;
    text-align: center;
    text-decoration: none;
    flex: 1;
    &.edit{
        color: #333 !important;
    }
    &.clear {
      color: #ddd;
      background: #fff;
    }
    &.determine {
      color: #fff;
      background: #00d762;
      border: 0.133333vw solid #00d762;
    }
  }
}
</style>
