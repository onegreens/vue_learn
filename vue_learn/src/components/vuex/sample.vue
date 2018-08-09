<!--  -->
<template>
    <div>
        <div>用户名：{{nickname}}</div>
        <div>年龄：{{age}}</div>
        <div @click="useAction">useAction</div>
    </div>
</template>

<script>
import store from "../../store/store";
export default {
    data() {
        return {
            nickname: this.$store.state.user.nickname,
            age: this.$store.state.user.age
        };
    },

    methods: {
        useAction() {
            var that = this;
            this.$store
                .dispatch("changeNickName", "没有名字")
                .then(res => {
                    console.log(
                        "返回数据" +
                            that.$store.state.user.nickname +
                            "返回状态：" +
                            res
                    );
                })
                .catch(e => {
                    console.log("返回失败：" + e);
                });
        }
    }
};
</script>