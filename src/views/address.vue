// 设置收获地址组件
<template>
  <div class="address">
    <hx-header :title="'选择收货地址'" :isLeft="true"></hx-header>
    <div class="city_search">
      <div class="seaech">
        <span class="city" @click="$router.push('/city')">
          {{ city }}
          <i class="fa fa-angle-down"></i>
          <span>  |</span>
        </span>
        <i class="fa fa-search"></i>
        <input type="text" v-model="search" placeholder="小区/写字楼/学校">
      </div>
      <hx-location :address="Address" @click="selectAddress"></hx-location>
    </div>
    <!-- 地址搜索信息展示 -->
    <div class="area">
      <ul class="area_list" v-for="(val, index) in areaList" :key="`${val.adcode}${index}`">
        <li @click="selectAddress(val)">
          <h4>{{ val.name }}</h4>
          <p>{{ val.district }}{{ val.address }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import header from "../components/header";
import { mapState } from "vuex";
import location from "../components/location";
export default {
  name: "Address",
  created() {
    try {
      this.$store.state.map.location
        ? (this.$store.state.map.city ? this.city = this.$store.state.map.city : this.city = this.$store.state.map.location.addressComponent.city)
        : "";
      this.$store.state.map.address
        ? (this.Address = this.$store.state.map.address)
        : "";
    } catch (error) {
      error;
    }
  },
  components: {
    "hx-header": header,
    "hx-location": location
  },
  data() {
    return {
      city: "定位中", //城市
      search: "", //搜索内容,
      Address: "", //定位详情信息
      areaList: [] //搜索地址结果
    };
  },
  methods: {
    selectAddress(val){
        let data = typeof(val) == 'object' ? `${val.district}${val.address}${val.name}` : val
        this.$store.commit('map/setAddress', data)
        this.$router.push('/home')
    }
  },
  computed: {
    ...mapState("map", ["location"]),
    ...mapState("map", ["address"])
  },
  watch: {
    location() {
      this.city = this.location.addressComponent.city;
    },
    address() {
      this.Address = this.address;
    },
    search() {
      // 搜索地址
      let that = this;
      AMap.plugin("AMap.Autocomplete", function() {
        // 实例化Autocomplete
        var autoOptions = {
          //city 限定城市，默认全国
          city: that.city ? that.city : "全国"
        };
        var autoComplete = new AMap.Autocomplete(autoOptions);
        autoComplete.search(that.search, function(status, result) {
          // 搜索成功时，result即是对应的匹配数据
          // console.log(result)
          that.areaList = result.tips;
        });
      });
    }
  },
  beforeRouteEnter(to, from, next) {
        next(vm => {
          vm.city = to.params.city? to.params.city : vm.city;
        })
  }
};
</script>

<style lang='scss' scoped>
.address {
  box-sizing: border-box;
  padding-top: 45px;
  width: 100%;
  height: 100%;
  .city_search {
    background-color: #fff;
    padding: 10px 20px;
    color: #333;
    .seaech {
      background-color: #eee;
      height: 40px;
      border-radius: 10px;
      box-sizing: border-box;
      line-height: 40px;
      display: flex;
      position: relative;
      align-items: center;
      padding-left: 5px;
      &>.city {
        flex: 1;
        overflow:hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      & > i {
        position: absolute;
        left: 25%;
      }
      input {
        flex: 3;
        border: none;
        outline: none;
        padding-left: 22px;
        background-color: #eee;
      }
    }
  }
  .area{
      margin-top: 16px;
    background: #fff;
    padding-bottom: 45px;
    .area_list{
        list-style: none;
        display: flex;
        border-bottom: 1px solid #eee;
        padding: 0 20px;
        margin: 0;
        li{
            h4{
                margin-bottom: 0;
                overflow:hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            p{
                margin-top: 0;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }
        }
    }
  }
  
}
</style>
