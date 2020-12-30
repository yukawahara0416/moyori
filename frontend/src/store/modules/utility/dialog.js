export default {
  state: {
    dialogSign: false,
    dialogSpotCreate: false,
    dialogSpotEdit: false,
    dialogTutorial: false
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
    },

    dialogTutorial(state) {
      return state.dialogTutorial
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
      state.dialogTutorial = false
    }
  },

  actions: {
    dialogOff(context, target) {
      target
        ? context.commit('dialogOff', target)
        : context.commit('dialogOffAll')
    }
  }
}
