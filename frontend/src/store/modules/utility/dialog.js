export default {
  state: {
    dialogSign: false,
    dialogSpotCreate: false,
    dialogSpotEdit: false
  },

  getters: {
    dialogSign(state) {
      return state.dialogSign
    },

    dialogSpotCreate(state) {
      return state.dialogSpotCreate
    },

    dialogSpotEdit(state) {
      return state.dialogSpotEdit
    }
  },

  mutations: {
    dialogOn(state, target) {
      state[target] = true
    },

    dialogOff(state, target) {
      state[target] = false
    },

    dialogOffAll(state) {
      state.dialogSign = false
      state.dialogSpotCreate = false
      state.dialogSpotEdit = false
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
