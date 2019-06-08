// 城市选择组件
<template>
  <div class="cityList">
    <div class="search_wrap">
      <div class="search">
        <i class="fa fa-search"></i>
        <input type="text" placeholder="请输入城市名" v-model='city_val'>
      </div>
      <button @click="$router.go('-1')">取消</button>
    </div>
    <div style="height: 100%" v-if="!city_val">
        <div class="location">
            <hx-location :address="city" @click='selectCity'></hx-location>
        </div>
        <hx-alphabet :cityInfo="cityInfo" :keys="keys" style="height:100%" ref="allcity" @selectCity="selectCity"></hx-alphabet>
    </div>
    <div class="search_city" v-if="citiesList">
        <ul>
            <li v-for="(val, index) in citiesList" :key="val+index" @click="selectCity(val)">{{ val }}</li>
        </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import location from "../components/location";
import alphabet from "../components/alphabet"
export default {
  name: "city",
  created() {
    try {
      this.$store.state.map.location
        ? (this.$store.state.map.city ? this.city = this.$store.state.map.city : this.city = this.$store.state.map.location.addressComponent.city)
        : "";
    } catch (error) {
      error;
    }
    this.getCityInfo();
  },
  data() {
    return {
      city: "定位中",
      city_val: '',
      cityInfo: null,// 获取的城市列表
      keys: [],// data的key
      allcities: [], // 所有城市名称
      citiesList: [], // 检索的城市

    };
  },
  computed: {
    ...mapState("map", ["location"])
  },
  watch: {
    location() {
      this.city = this.location.addressComponent.city;
      
    },
    city_val () {
        if(!this.city_val){
            this.citiesList = [];
            return;
        }
        this.citiesList = this.allcities.filter(item => {
            return item.indexOf(this.city_val) != -1;
        })
    }
  },
  components: {
    "hx-location": location,
    "hx-alphabet": alphabet
  },
  methods: {
      getCityInfo () {
          this.$axios("/api/posts/cities").then(res => {
            //   console.log(res)
            this.cityInfo = res.data;
            this.keys = Object.keys(res.data);
            this.keys.pop();
            this.keys.sort();
            this.$nextTick( () => {
                try {
                    this.$refs.allcity.initScroll();
                } catch (error) {
                    error
                }
            });
            this.keys.forEach(key => {
                this.cityInfo[key].forEach(city => {
                    // console.log(city)
                    this.allcities.push(city.name)
                })
            })
          }).catch(err => {
              console.log(err)
          })
      },
      selectCity (val) {
        //   console.log(val);
        let name = val.name ? val.name : val
        console.log(name)
        this.$router.push({name: 'address', params: {city: name}})
        this.$store.commit('map/changeCity', name)
      }
  }
};
</script>

<style lang="scss" scpoed>
.cityList {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-top: 45px;
  .search_wrap {
    width: 100%;
    background-color: #fff;
    box-sizing: border-box;
    position: fixed;
    top: 0;
    display: flex;
    padding: 5px 20px;
    .search {
      background-color: #eee;
      padding-left: 5px;
      border-radius: 8px;
      flex: 4;
      input {
        border: none;
        outline: none;
        line-height: 35px;
        background-color: #eee;
        padding: 0;
        padding-left: 5px;
      }
    }
    button {
      border: none;
      background-color: #fff;
      flex: 1;
      color: #009eef;
    }
  }
  .location{
      background-color: #fff;
      padding: 10px 16px;
  }
  .search_city{
      background-color: #fff;
      padding: 5px 16px;
      ul{
          list-style: none;
          padding-left: 0;
          li{
              padding: 10px;
              border-bottom: 1px solid #eee;
          }
      }
  }
}
</style>
