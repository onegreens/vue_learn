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
      return new Promise((resolve, reject) => {
        if (nickname) {
          console.info("user接收到:" + nickname);
          commit('setNickName', nickname);
          console.info("user修改完成:" + state.nickname);
          resolve("成功");

        } else {
          reject("失败");
        }
      })
    }
  }
}

export default user
