# tinyshop-shop
![](https://img.shields.io/github/package-json/dependency-version/tuchongyang/tinyshop-vue/vue)
![](https://img.shields.io/github/package-json/dependency-version/tuchongyang/tinyshop-vue/vant)
![](https://img.shields.io/github/package-json/dependency-version/tuchongyang/tinyshop-vue/vue-router)
![](https://img.shields.io/github/package-json/dependency-version/tuchongyang/tinyshop-vue/vuex)

基于vue3实现的移动端商城(vue3+vuex-ruoter+axios)

## 简介
本项目是基于vue3实现的h5移动商城，包括商品列表、加入购物车、下单等商城基本功能。本项目包含服务端，后台管理、移动商城，开发文档、流程完整详尽，非常适合作为个人练手项目。

## 实现功能
**首页：** 商品列表、轮播图、商品详情

**分类** 三级分类列表

**购物车** 加入购物车、下单

**我的** 登录、资料修改、地址管理、订单管理

## 预览
[线上预览](http://tinyshop.tucy.top/)

建议Chrome调试手机模式下预览

[API接口文档](http://tinyshop.tucy.top/doc)

## 运行

```
git clone https://github.com/tuchongyang/tinyshop-vue

cd tinyshop-vue

npm install

npm run serve

```

## 部署上线

1、运行`npm run build`，

2、将dist目录上传到服务器指定目录，例如: /root/tcy/tinyshop-vue/dist

3、自行安装nginx，并添加如下配置

```
server {
        listen       80;
        server_name  localhost;

        location / {
            root   /root/tcy/tinyshop-vue/dist;
            index  index.html index.htm;
            try_files $uri $uri/ /index.html;
        }
        #以下为服务器需要的配置
        location /api {
            proxy_pass   http://127.0.0.1:7002/api;
        }
        location /public {
            alias   /root/tcy/tinyshop-server/app/public;
            index  index.html index.htm;
        }

    }

```

后端服务器部署详见: https://github.com/tuchongyang/tinyshop-server

4、启动nginx


## 结语
如果这个项目对你有帮助的话，请给个星点个star

## 交流群
qq群：145679486
