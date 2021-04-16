<template>
    <div>
        <van-swipe @change="onChange" class="swiper">
            <van-swipe-item v-for="(item,index) in swipes" :key="index"><img :src="item.src"></van-swipe-item>
            <van-swipe-item>2</van-swipe-item>
            <van-swipe-item>3</van-swipe-item>
            <van-swipe-item>4</van-swipe-item>
            <template #indicator>
                <div class="custom-indicator">{{ current + 1 }}/4</div>
            </template>
        </van-swipe>
    </div>
</template>
<script>
import {ref} from 'vue';

/**轮播图逻辑 */
const swperEffect = ()=>{
    const current = ref(0);
    const onChange = (index) => {
        current.value = index;
    };
    const swipes = ref([
        {src: '//cdn.cnbj1.fds.api.mi-img.com/mi-mall/0721f0bed43776a72e9189592f87db13.jpg?thumb=1&w=720&h=360'}
    ])
    return {
        current,
        onChange,
        swipes
    };
}
export default{
    components:{},
    setup(){
        const {current,onChange,swipes} = swperEffect()
        return {
            current,
            onChange,
            swipes
        }
    }
}
</script>
<style lang="scss" scoped>
.custom-indicator {
    position: absolute;
    right: 5px;
    bottom: 5px;
    padding: 2px 5px;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.1);
}
.swiper{
    img{
        max-width: 100%;
    }
}
</style>
