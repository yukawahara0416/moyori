export default {
  state: {
    dialogSign: false,
    dialogSpotCreate: false
  },

  getters: {
    dialogSign(state) {
      return state.dialogSign
    },

    dialogSpotCreate(state) {
      return state.dialogSpotCreate
    }
  },

  mutations: {
    dialogOn(state, target) {
      state[target] = true
    },

    dialogOff(state) {
      state[target] = false
    },

    dialogOffAll(state) {
      state.dialogSign = false
      state.dialogSpotCreate = false
    }
  },

  actions: {
    dialogOn(context, target) {
      context.commit('dialogOn', target)
    },

    dialogOff(context, target) {
      target
        ? context.commit('dialogOff', target)
        : context.commit('dialogOffAll')
    }
  }
}
