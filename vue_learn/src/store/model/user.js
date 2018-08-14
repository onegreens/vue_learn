const user = {
  state: {
    nickname: "张三",
    age: 0
  },
  mutations: {
    setNickName: (state, nickname) => {
      console.info("user.mutations.setNickName接收到:" + nickname);
      state.nickname = nickname;
    },
    setAge: (state, age) => {
      state.age = age;
    }
  },
  actions: {
    changeNickName({
      commit,
      state
    }, nickname) {
      return new Promise((resolve1, reject1) => {
        if (nickname) {
          console.info("user接收到:" + nickname);
          commit('setNickName', nickname);
          console.info("user修改完成:" + state.nickname);
          reject1("失败");
          resolve1("成功");
          

        } else {

          resolve1("成功");
          reject1("失败");
        }
      })
    }
  }
}

export default user
