<template>
    <div class="category-container">
        <div class="category-left">
            <ul>
                <li class="active">手机</li>
                <li>手机</li>
                <li>手机</li>
                <li>手机</li>
                <li>手机</li>
                <li>手机</li>
                <li>手机</li>
                <li>手机</li>
                <li>手机</li>
            </ul>
        </div>
        <div class="category-main">
            <div class="title">手机通讯</div>
            <ul class="cate-list">
                <li>
                    <div class="img"><img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/5dc32ec73299ff79556dcd1cf0f0ac11.png?thumb=1&w=200&h=200&f=webp&q=90"></div>
                    <div class="name">全面屏手机</div>
                </li>
                <li>
                    <div class="img"><img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/5dc32ec73299ff79556dcd1cf0f0ac11.png?thumb=1&w=200&h=200&f=webp&q=90"></div>
                    <div class="name">全面屏手机</div>
                </li>
                <li>
                    <div class="img"><img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/5dc32ec73299ff79556dcd1cf0f0ac11.png?thumb=1&w=200&h=200&f=webp&q=90"></div>
                    <div class="name">全面屏手机</div>
                </li>
            </ul>
            <div class="title">手机通讯</div>
            <ul class="cate-list">
                <li>
                    <div class="img"><img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/5dc32ec73299ff79556dcd1cf0f0ac11.png?thumb=1&w=200&h=200&f=webp&q=90"></div>
                    <div class="name">全面屏手机</div>
                </li>
                <li>
                    <div class="img"><img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/5dc32ec73299ff79556dcd1cf0f0ac11.png?thumb=1&w=200&h=200&f=webp&q=90"></div>
                    <div class="name">全面屏手机</div>
                </li>
                <li>
                    <div class="img"><img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/5dc32ec73299ff79556dcd1cf0f0ac11.png?thumb=1&w=200&h=200&f=webp&q=90"></div>
                    <div class="name">全面屏手机</div>
                </li>
                <li>
                    <div class="img"><img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/5dc32ec73299ff79556dcd1cf0f0ac11.png?thumb=1&w=200&h=200&f=webp&q=90"></div>
                    <div class="name">全面屏手机</div>
                </li>
                <li>
                    <div class="img"><img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/5dc32ec73299ff79556dcd1cf0f0ac11.png?thumb=1&w=200&h=200&f=webp&q=90"></div>
                    <div class="name">全面屏手机</div>
                </li>
                <li>
                    <div class="img"><img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/5dc32ec73299ff79556dcd1cf0f0ac11.png?thumb=1&w=200&h=200&f=webp&q=90"></div>
                    <div class="name">全面屏手机</div>
                </li>
            </ul>
        </div>
    </div>
</template>
<style scoped lang="scss">
.category-container{
    position: absolute;top:0;left:0;right:0;bottom: 1.4rem;
}
.category-left{
    position:absolute;top:0;bottom:0;width: 2.6rem;background:#fff;overflow:auto;
    li{
        padding: .4rem;border-bottom: 1px solid #eee;color: #606060;position:relative;
        &.active{
            background:#f8f8f8;color:#ff9600;
            &:before{
                content:"";display:inline-block;width: 4px;height:.5rem;background: #ff9600;position:absolute;left:0;top:50%;margin-top: -.25rem;border-radius: 0 3px 3px 0;
            }
        }
    }
}
.category-main{
    background:#f8f8f8;margin-left:2.6rem;padding-left: .4rem;position:relative;height:100%;overflow:auto;
    .title{
        padding: .3rem 0;
    }
    .cate-list{
        background:#fff;padding-bottom:.3rem;
        li{
            width: 33.33333%;float:left;text-align:center;
            .img{
                width:100%; padding-bottom: 100%;position:relative;
                img{
                    position: absolute;width: 100%;height: 100%;left:0;top:0;
                }
            }
            .name{
                color:#666;
            }
        }
        &:after{
            content:"";display:block;clear:both;
        }
    }
}
</style>