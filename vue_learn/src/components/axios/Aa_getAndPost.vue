<!-- get post请求 -->
<template>
    <div>
        <div @click="postData">查看</div>
        <div @click="turnHello">跳转至hello</div>
        <ul>
            <li v-for="goods in goodslist" :key="goods.getId">
                <a v-bind:href="'Details_Page.htm?id='+goods.getId">
                    <div class="tpbuju">
                        <img :src="goods.imgUrl">
                    </div>
                    <div class="By-price">
                        <div class="Full10">{{ goods.getGoods_name }}</div>
                    </div>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            goodslist: []
        };
    },

    methods: {
        //get方法
        getData: function() {
            var that = this;
            this.$axios
                .get("api/minapps/indexRecommendGoods.htm")
                .then(function(response) {
                    console.log(response);
                    that.goodslist = response.data.data;
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        //post方法
        postData: function() {
            var that = this;
            that.$axios
                .post("api/minapps/getGoodsById.htm", { goodsId: 1 })
                .then(function(response) {
                    console.log(response);
                })
                .catch(function(error) {
                    console.log(response);
                });
        },
        turnHello: function() {
            this.$router.push({ path: "/Hello" });
        }
    }
};
</script>
<style>
</style>