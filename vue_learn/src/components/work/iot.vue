<!-- get post请求 -->
<template>
    <div>
        <div @click="postData">查看</div>

    </div>
</template>

<script>
import { default as api } from "../../utils/api";

export default {
    data() {
        return {
            return_data: "",
            this_data: [
                {
                    companyName: "string",
                    height: 100,
                    id: 0,
                    name: "加工车间131",
                    no: "w00131",
                    type: "add",
                    url: "xx",
                    width: 100
                },
                {
                    companyName: "string",
                    height: 100,
                    id: 0,
                    name: "加工车间12",
                    no: "w0012",
                    type: "add",
                    url: "xx",
                    width: 100
                }
            ]
        };
    },

    methods: {
        //post方法
        postData: function() {
            // var data = JSON.stringify(this.this_data);
            var data = this.this_data;

            var that = this;
            that.$axios
                .post("api/iot/shop/list", {
                    data: data,
                    companyName: ""
                })
                .then(function(response) {
                    console.log(response.data);
                })
                .catch(function(error) {
                    console.log(error.data);
                });

            // api({
            //     url: `api/iot/shop/list`,
            //     method: "post",
            //     data: {
            //         data: data,
            //         token: "123",
            //         companyName: ""
            //     }
            // })
            //     .then(data => {
            //         console.log(data);
            //     })
            //     .catch(error => {
            //         console.log(error);
            //     });
        }
    }
};
</script>
<style>
</style>