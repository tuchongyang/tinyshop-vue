<template>
    <div class="header">
       <div class="header-left">
            <van-icon name="arrow-left" v-show="headerLeftStatus"  @click="$router.back()"></van-icon>
       </div>
        <div class="header-in">{{title||$route.meta.title}}</div>
        <div class="header-right">
            <slot name="right"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'header-bar',
    props: ['title','headerLeftStatus'],
    data() {
        return {}
    },
    methods: {
    }
}
</script>

<style lang="scss" scoped>
.header {
    width: 100%;
    height: 1.2rem;
    background: #fff;
    position: fixed;
    z-index: 1;
    display: flex;
    top:0;
    left:0;
    box-shadow: 0 1px 5px 1px rgba(0, 0, 0,.05);

    .header-left {
        width: 10%;
        height: 100%;

        i {
            font-size: 0.6rem;
            line-height: 1.2rem;
            text-align: center;
            display: block;
        }
    }

    .header-in {
        width: 80%;
        height: 100%;
        line-height: 1.2rem;
        text-align: center;
        font-size: 0.4rem;
        display: block;
    }

    .header-right {
        width: 15%;
        height: 100%;
        white-space: nowrap;
        text-align: center;
        :deep(.btn){
            line-height: 1.2rem;
            padding: 0 .15rem;
            &:active{
                background: #fafafa;
            }
        }
    }
}
</style>
