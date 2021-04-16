<template>
    <div class="footer-bar">
        <div class="nav-bar">
            <router-link class="item" :class="{active: $route.path==item.path}" :to="item.path" v-for="(item,index) in menulist" :key="index">
                <img class="icon" :src="$route.path==item.path?item.selectIconPath:item.iconPath">
                <span class="txt">{{item.name}}</span>
            </router-link>
        </div>
    </div>
</template>
<script>
export default {
    name:'footer-bar',
    props:{
        menulist:{
            type: Array,
            default(){return []}
        }
    },
    data(){
        return {
            
        }
    }
}
</script>
<style lang="scss" scoped>
.footer-bar{
    position: fixed;
    z-index: 9999;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    box-shadow: 0 3px 14px 2px rgba(0, 0, 0,.12);
    height: 1.4rem;
    .nav-bar{
        display: flex;
        .item{
            flex: 1;
            justify-content: center;
            text-align: center;
            line-height: 1;
            padding: .1rem;
            opacity: .6;
            height: 1.4rem;
            .icon{
                width: 1em;
                height: 1em;
                font-size: .7rem;
                margin-bottom: .1rem;
                vertical-align: top;
            }
            .txt{
                display: block;
            }
            &.active{
                color: #ff9600;
                opacity: 1;
            }
            &:active{
                background:#fafafa;
            }
        }
    }
}
</style>