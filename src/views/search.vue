<template>
  <div class="search">
    <hx-header :title="'搜索'" :isLeft="true"></hx-header>
    <div class="search_header">
      <form class="seach_wrap">
        <i class="fa fa-search"></i>
        <input type="text" v-model="key_word" placeholder="请输入商家商品信息">
        <button @click.prevent="searchHandel">搜索</button>
      </form>
    </div>
    <div class="seach_body" v-if="result && !showShop">
      <div class="empy_wrap" v-if="empty">
        <img src="https://fuss10.elemecdn.com/d/60/70008646170d1f654e926a2aaa3afpng.png" alt>
        <div class="empty_txt">
          <h4>附近没有搜索结果</h4>
          <span>换个关键词试试吧</span>
        </div>
      </div>
      <div v-else>
        <ul class="search-list">
          <li v-for="(val, index) in result.restaurants" :key="index" @click="showItem(val)">
            <img :src="val.image_path" alt>
            <div class="showItem">
              <span class="title">{{ val.name }}</span>
              <span class="rating">评分{{ val.rating }}</span>
            </div>
          </li>
          <li v-for="(val, index) in result.words" :key="val + index" @click="showItem(val)">{{ val }}</li>
        </ul>
      </div>
    </div>
    <!-- 商家信息 -->
    <div class="content" v-if="showShop">商家</div>
  </div>
</template>

<script>
import header from "../components/header";
export default {
  name: "Search",
  components: {
    "hx-header": header
  },
  data() {
    return {
      key_word: "",
      result: null,
      empty: false,
      showShop: false
    };
  },
  methods: {
      searchHandel () {
          if(!this.key_word){
            return;
          }
          if(this.result && (this.result.restaurants.length || this.result.words.length > 0)){

          }else{
              this.empty = true;
          }
      },
      showItem () {
        this.showShop = true;
      }
  },
  watch: {
    key_word() {
        this.empty = false;
      this.$axios(`/api/profile/typeahead/${this.key_word}`).then(res => {
        console.log(res.data);
        this.result = res.data;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.search {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  .search_header {
    margin-top: 45px;
    background: #fff;
    padding: 0 4.266667vw;
    .seach_wrap {
      padding: 2.933333vw 2.933333vw 2.933333vw 0;
      display: flex;
      align-items: center;
      position: relative;
      .fa-search {
        width: 2.933333vw;
        height: 2.933333vw;
        color: #888;
        position: absolute;
        top: 4.6666666vw;
        left: 2.933333vw;
      }
      input {
        flex-grow: 1;
        border-radius: 0.266667vw;
        background-color: #f8f8f8;
        padding: 1.733333vw 4vw 1.733333vw 8.8vw;
        color: #666;
        outline: none;
        border: none;
      }
      button {
        outline: none;
        border: none;
        color: #777;
        font-size: 0.426667rem;
        background: #fff;
        font-weight: 700;
        margin-left: 2.933333vw;
        font-size: 14px;
      }
    }
  }
  .seach_body {
    width: 100%;
    height: calc(100% - 95px);
    overflow: auto;
    .search-list {
      background: #fff;
      list-style: none;
      padding-left: 0;
      li {
        padding: 0 4.266667vw;
        display: flex;
        height: 13.933333vw;
        align-items: center;
        img {
          width: 6.4vw;
          height: 6.4vw;
          margin-right: 4.266667vw;
          border-radius: 0.133333vw;
        }
        .showItem {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex: 1;
          height: 13.933333vw;
          border-bottom: 1px solid #e3e3e3;
          .title {
            display: inline-block;
            max-width: 56vw;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 0.888rem;
            color: #333;
            margin-right: 0.8vw;
          }
          .rating {
            color: #999;
            font-size: 0.8rem;
          }
        }
      }
    }
    .empy_wrap {
      width: 100%;
      height: 100%;
      overflow: hidden;
      background: #fff;
      display: flex;
      justify-content: center;
      img {
        width: 35vw;
        height: 35vw;
      }
      .empty_txt {
        h4 {
          color: #666;
          font-size: 1rem;
          margin: 12vw 0 2vw 0;
        }
        span {
          color: #999;
          font-size: 0.8rem;
        }
      }
    }
  }
}
</style>
