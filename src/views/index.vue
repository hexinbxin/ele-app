// 主页
<template>
    <div class="index">
        <router-view></router-view>
        <hx-tabbar :data='tabbarData'></hx-tabbar>
    </div>
</template>

<script>
import tabbar from '../components/tabbar'
export default {
    name: 'index',
    components: {
        'hx-tabbar': tabbar
    },
    data () {
        return {
            tabbarData: [
                {title: '首页', ico: 'home', path: '/home'},
                {title: '订单', ico: 'file-text-o', path: '/order'},
                {title: '我的', ico: 'user', path: '/me'}
            ]
        }
    }
}
</script>

<style lang='scss' scoped>
    .index{
        width: 100%;
        height: calc(100% - 45px);
    }
</style>
