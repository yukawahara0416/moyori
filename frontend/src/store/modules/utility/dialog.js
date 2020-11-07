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
    dialogOn(state, targetDialog) {
      state[targetDialog] = true
    },

    dialogOff(state, targetDialog) {
      state[targetDialog] = false
    },

    dialogOffAll(state) {
      state.dialogSign = false
      state.dialogSpotCreate = false
      state.dialogSpotEdit = false
    }
  },

  actions: {
    dialogOn(context, targetDialog) {
      context.commit('dialogOn', targetDialog)
    },

    dialogOff(context, targetDialog) {
      targetDialog
        ? context.commit('dialogOff', targetDialog)
        : context.commit('dialogOffAll')
    }
  }
}
