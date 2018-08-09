<!-- 执行多个并发请求 -->
<template>
  <div @click="doall">测试</div>
</template>

<script>
export default {
    data() {
        return {};
    },
    methods: {
        getRecommend: function() {
            return this.$axios
                .get("api/minapps/indexRecommendGoods.htm")
                .then(function(response) {
                    console.log(response);
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        //执行多个并发请求
        doall: function() {
            var that = this;
            that.$axios.all([that.getRecommend(), that.getRecommend()]).then(
                that.$axios.spread(function(acct,perms){
                    console.log(acct);
                    console.log(perms);
                })
            );
        }
    }
};
</script>