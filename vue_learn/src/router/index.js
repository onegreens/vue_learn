import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@/components/HelloWorld";
import Hello from "@/components/Hello";
import Aa_getAndPost from "../components/axios/Aa_getAndPost";
import Ab_all from "../components/axios/Ab_all";
import sample from "../components/vuex/sample";


Vue.use(Router);
const hw = [{
  path: "/HelloWorld",
  name: "HelloWorld",
  component: HelloWorld
}, ];

export default new Router({
  mode: "history",

  routes: [
    ...hw,
    {
      path: "/sample",
      name: "sample",
      component: sample
    },
    {
      path: "/Hello",
      name: "Hello",
      component: Hello
    },
    {
      path: "/Aa_getAndPost",
      name: "Aa_getAndPost",
      component: Aa_getAndPost
    },
    {
      path: "/Ab_all",
      name: "Ab_all",
      component: Ab_all
    }
  ]
});
