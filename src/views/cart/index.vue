<template>
    <div class="cart-container">
        <div class="cart-list">
            <div class="item">
                <div class="img">
                    <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/5dc32ec73299ff79556dcd1cf0f0ac11.png?thumb=1&w=200&h=200&f=webp&q=90">
                    <div class="check"><van-icon name="success" /></div>
                </div>
                <div class="det">
                    <div class="title">OVBE长袖风衣</div>
                    <div class="desc">春装款 L</div>
                    <div class="price">￥279</div>
                    <div class="num"><van-stepper v-model="stepper" /></div>
                    <div class="btn-del"><van-icon name="delete-o" /></div>
                </div>
            </div>
            <div class="item">
                <div class="img">
                    <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/5dc32ec73299ff79556dcd1cf0f0ac11.png?thumb=1&w=200&h=200&f=webp&q=90">
                    <div class="check"><van-icon name="success" /></div>
                </div>
                <div class="det">
                    <div class="title">OVBE长袖风衣</div>
                    <div class="desc">春装款 L</div>
                    <div class="price">￥279</div>
                    <div class="num"><van-stepper v-model="stepper" /></div>
                    <div class="btn-del"><van-icon name="delete-o" /></div>
                </div>
            </div>
        </div>
        <div class="cart-footer">
            <van-button class="btn-submit" round color="linear-gradient(to right, #ff6034, #ee0a24)" size="small">去结算</van-button>
            <div class="price">￥13344</div>
        </div>
    </div>
</template>
<style scoped lang="scss">
.cart-container{
    padding-bottom: 50px;
}
.cart-list{
    .item{
        border-bottom: 1px solid #eee;padding: .4rem;
        &:after{
            content:"";display: block;clear: both;
        }
        .img{
            width: 2.4rem;height: 2.4rem;background:#f4f4f4;float:left;position:relative;
            img{
                width: 100%;height: 100%;border-radius:5px;
            }
            .check{
                position: absolute;top: -.2rem;left:-.2rem;background:#fff;border-radius:50%;background: #ff9600;color:#fff;width: .7rem;height: .7rem;;line-height:.6rem;text-align: center;border:3px solid #fff;
                i{
                    vertical-align: middle;
                }
            }
        }
        .det{
            margin-left: 2.8rem;margin-right: .4rem;
            .title{
                white-space: nowrap;text-overflow: ellipsis;overflow: hidden;margin-bottom: .1rem;font-size: .4rem;
            }
            .desc{
                color:#999;margin-bottom: .1rem;
            }
            .price{
                margin-bottom: .1rem;font-size: .4rem;
            }
            .btn-del{
                position:absolute;top: .4rem;right: .3rem;color:#999;
            }
        }
    }
}
.cart-footer{
    position: absolute;width: 100%;left:0;bottom: 1.4rem;padding: .2rem .4rem;overflow: hidden;background:#fff;
    .btn-submit{
        float:right;padding-left: 20px;padding-right:20px;
    }
    .price{
        float: right;line-height:30px;margin-right: .2rem;

    }
}
</style>