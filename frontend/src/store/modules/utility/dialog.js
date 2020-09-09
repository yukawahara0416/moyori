export default {
  state: {
    dialogSign: false,
    dialogProfileEdit: false,
    dialogProfileDelete: false,
    dialogSpotCreate: false,
    dialogSpotEdit: false
  },

  getters: {
    dialogSign(state) {
      return state.dialogSign
    },

    dialogProfileEdit(state) {
      return state.dialogProfileEdit
    },

    dialogProfileDelete(state) {
      return state.dialogProfileDelete
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

    dialogOff(state) {
      state.dialogSign = false
      state.dialogProfileEdit = false
      state.dialogProfileDelete = false
      state.dialogSpotCreate = false
      state.dialogSpotEdit = false
    }
  },

  actions: {
    dialogOn(context, target) {
      context.commit('dialogOn', target)
    },

    dialogOff(context) {
      context.commit('dialogOff')
    }
  }
}
