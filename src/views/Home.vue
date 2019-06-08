//  home页
<template>
  <div class="home">
    <!-- // 头部地址信息 -->
    <div class="header">
      <div class="address_map" @click="$router.push('/address')">
        <i class="fa fa-map-marker"></i>
        <span>{{ address }}</span>
        <i class="fa fa-sort-desc"></i>
      </div>
    </div>
    <!-- // 搜索框 -->
    <div class="search" :class="{fixed: show}">
      <div class="shop_search" @click="$router.push('/search')">
        <span class="fa fa-search"></span>
        搜索商家 商家名称
      </div>
    </div>
    <!-- // 轮播，分类  -->
    <div class="content">
      <mt-swipe :auto="3000" class="swipe">
        <mt-swipe-item v-for="(img, index) in swipeImg" :key="index">
          <img :src="img" alt>
        </mt-swipe-item>
      </mt-swipe>
      <mt-swipe :auto="0" class="entries">
        <mt-swipe-item v-for="(entry, i) in entries" :key="i" class="entry">
          <div class="foodentry" v-for="(val, index) in entry" :key="val+index">
            <div class="img_wrap">
              <img :src="val.image" alt>
            </div>
            <p>{{ val.name }}</p>
          </div>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <!-- 推荐商家 -->
    <div class="sopList-title">推荐商家</div>
    <!-- 筛选导航 -->
    <hx-filter :filterDate="filterDate" @searchFixed="showFilter" @updata="updata"></hx-filter>
    <!-- 商家信息 -->
    <mt-loadmore
      :top-method="loadData"
      :bottom-method="loadMore"
      :bottom-all-loaded="allLoaded"
      :auto-fill="false"
      :bottomPullText="bottomPullText"
      ref="loadmore"
      class="mt-loadmore"
    >
      <hx-indexShop
        v-for="(val, index) in restaurants"
        :key="val.restaurant.authentic_id + index"
        :restaurant="val.restaurant"
      ></hx-indexShop>
    </mt-loadmore>
  </div>
</template>

<script>
import { mapState } from "vuex";
// import { Swipe, SwipeItem, Loadmore } from "mint-ui";
import filter from "../components/filter";
import indexShop from "../components/indexShop";
export default {
  name: "home",
  computed: {
    ...mapState("map", ["address"])
    // address () {
    //     tis.$store.state.map.address
    // }
  },
  created() {
    this.getDate();
  },
  data() {
    return {
      swipeImg: [],
      entries: [],
      filterDate: null,
      show: false,
      page: 1,
      size: 5,
      restaurants: [],
      allLoaded: false,
      bottomPullText: "上拉加载更多",
      scroll: null,
      data: ''
    };
  },
  methods: {
    getDate() {
      // 获取商品分类信息
      this.$axios.get("/api/profile/shopping").then(res => {
        console.log(res.data);
        this.swipeImg = res.data.swipeImgs;
        this.entries = res.data.entries;
      });
      // 获取排序，筛选信息
      this.$axios("/api/profile/filter").then(res => {
        console.log(res);
        this.filterDate = res.data;
      });
      this.loadData();
    },
    showFilter(val) {
      this.show = val;
    },
    // 排序
    updata(code) {
      if(typeof(code) == 'string'){
        this.data = code;
      }else{
        this.data = code.MPI + code.offer + code.per
      }
      console.log(this.data)
      this.loadData()
    },
    loadData() {
      // 获取商家信息
      this.page = 1;
      this.allLoaded = false;
      this.bottomPullText = "上拉加载更多";
      this.$axios
        .post(`/api/profile/restaurants/${this.page}/${this.size}`, {condition: this.data})
        .then(res => {
          console.log(res.data);
          this.restaurants = res.data;
          this.$refs.loadmore.onTopLoaded();
        });
    },
    loadMore() {
      if (!this.allLoaded) {
        this.page++;
        this.allLoaded = false;
        this.bottomPullText = "上拉加载更多";
        this.$axios
          .post(`/api/profile/restaurants/${this.page}/${this.size}`)
          .then(res => {
            this.restaurants = this.restaurants.concat(res.data);
            this.$refs.loadmore.onBottomLoaded();
            if (res.data.length == 0) {
              this.allLoaded = true;
              this.bottomPullText = "没有更多了";
            }
          });
      }
    }
  },
  components: {
    "hx-filter": filter,
    "hx-indexShop": indexShop
  }
};
</script>


<style lang='scss' scoped>
.home {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  .header {
    background-color: #009eef;
    padding: 16px 16px 0;
    .address_map {
      color: #fff;
      font-weight: bold;
      i {
        margin: 0 3px;
        font-size: 18px;
      }
      span {
        width: 80%;
        display: inline-block;
        width: 80%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
  .search {
    &.fixed {
      width: 100%;
      position: fixed;
      top: 0;
      z-index: 999;
    }
    background-color: #009eef;
    padding: 10px 16px;
    margin-top: -1px;
    position: sticky;
    top: 0;
    z-index: 999;
    box-sizing: border-box;
    .shop_search {
      background-color: #fff;
      padding: 10px 0;
      border-radius: 4px;
      text-align: center;
      color: #aaa;
    }
  }
  .content {
    .swipe {
      height: 100px;
      img {
        width: 100%;
        height: 100px;
      }
    }
    .entries {
      background: #fff;
      height: 47.2vw;
      text-align: center;
      overflow: hidden;
      .entry {
        .foodentry {
          width: 20%;
          float: left;
          position: relative;
          margin-top: 2.933333vw;
          .img_wrap {
            position: relative;
            display: inline-block;
            width: 12vw;
            height: 12vw;
            img {
              width: 100%;
              height: 100%;
            }
          }
          p {
            margin: 0;
            color: #666;
            font-size: 0.32rem;
          }
        }
      }
    }
  }
  .sopList-title {
    display: flex;
    align-items: flex;
    justify-content: center;
    height: 9.6vw;
    line-height: 9.6vw;
    font-size: 16px;
    color: #333;
    background: #fff;
    &:after,
    &:before {
      display: block;
      content: "一";
      width: 5.333333vw;
      height: 0.266667vw;
      color: #999;
    }
    &:after {
      margin-left: 3.466667vw;
    }
    &:before {
      margin-right: 3.466667vw;
    }
  }
}
.mt-loadmore {
  box-sizing: border-box;
  height: calc(100% - 95px);
  overflow: auto;
}
</style>
