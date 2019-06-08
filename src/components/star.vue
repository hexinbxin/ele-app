// 评分星星组件
<template>
    <div class="star">
        <i :class="`fa ${val}`" v-for="(val, i) in itemClass" :key="i"></i>
    </div>
</template>

<script>
export default {
    name: 'star',
    props: {
        rating: Number
    },
    computed: {
        itemClass () {
            let sty = [];
            let num = Math.floor(this.rating *2) / 2;
            for (let i = 0; i < num; i ++) {
                sty.push('fa-star');
            }
            if(num % 1 != 0){
                sty.push('fa-star-half-empty');
            }
            for (let i = 0; i < 5; i ++){
                if(sty[i]){
                    continue;
                }
                sty.push('fa-star-o');
            }
            return sty;
        }
    }
}
</script>

<style lang="scss" scoped>
    .star{
        margin-right: 1.066667vm;
        color: #ffbe00;
        display: inline-block;
    }
</style>
