// 渲染所有城市组件
<template>
    <div class="alphabet" v-if="cityInfo" ref="alphabet_scroll">
        <div class="scroll_wrap">
            <!-- 热门城市 -->
            <div class="hot cities">
                <div class="title">热门城市</div>
                <ul class="hot_city">
                    <li v-for="(val, index) in cityInfo.hotCities" :key="`${val.abbr}${index}`" @click="$emit('selectCity', val)">{{ val.name }}</li>
                </ul>
            </div>
            <!-- 所有城市 -->
            <div class="city_all">
                <div class="city_content cities" v-for="(val, index) in keys" :key="val+index">
                    <div class="title">{{ val }}</div>
                    <ul>
                        <li v-for="(city, i) in cityInfo[val]" :key="city.abbr+i" @click="$emit('selectCity', city)">{{ city.name }}</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="alphabet_keys">
            <ul>
                <!-- 热门城市 -->
                <li @click='positionKey($event)'>#</li>
                <!-- 所有城市 -->
                <li v-for="(val, index) in keys" :key="index" @click="positionKey($event)">{{ val }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
import bScroll from 'better-scroll'
export default {
    name: 'alphabet',
    props: {
        cityInfo: Object,
        keys: Array
    },
    data () {
        return {
            scroll: null
        }
    },
    methods: {
        initScroll (e) {
            this.scroll = new bScroll(this.$refs.alphabet_scroll, {
                click: true
            });
        },
        positionKey($event){
            let index = this.keys.indexOf($event.target.innerText) + 1;
            let cities = document.querySelectorAll('.cities');
            this.scroll.scrollToElement(cities[index], 250);
        }
    }
}
</script>

<style lang="scss" scpoed>
.alphabet{
    margin-top: 10px;
    background-color: #fff;
    padding: 0 16px;
    overflow: hidden;
    .scroll_wrap{
        overflow: auto;
        .hot{
            .title{
                color: #aaa;
                padding: 15px 0;
            }
            .hot_city{
                list-style: none;
                padding: 16px 0;
                margin: 0;
                display: flex;
                flex-flow: wrap row; 
                li{
                    width: 30%;
                    text-align: center;
                    background: #f1f1f1;
                    margin: 0 10px 10px 0;
                    padding: 10px;
                }
            }
        }
        .city_all{
            ul{
                list-style: none;
                li{
                    padding: 10px;
                    border-bottom: 1px solid #eee;
                }
            }
        }
    }
    .alphabet_keys{
        position: fixed;
        right: 0;
        top: 25%;
        ul{
            list-style: none;
            color: #aaa;
            font-size: 12px;
            line-height: 1.4;
            text-align: center;
            padding: 0 5px;
        }
    }
}

</style>
