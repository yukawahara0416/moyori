import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import spot from '@/store/modules/spot/spot.js'
import form from '@/store/modules/spot/form.js'
import vote from '@/store/modules/spot/vote.js'

import map from '@/store/modules/spot/map.js'

import auth from '@/store/modules/user/auth.js'
import user from '@/store/modules/user/user.js'

import dialog from '@/store/modules/utility/dialog.js'
import snackbar from '@/store/modules/utility/snackbar.js'
import loading from '@/store/modules/utility/loading.js'
import tab from '@/store/modules/utility/tab.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    spot: spot,
    form,
    vote,

    map,

    auth,
    user: user,

    dialog,
    snackbar,
    loading,
    tab
  },

  plugins: [
    createPersistedState({
      key: 'session',
      paths: ['auth.currentUser', 'auth.headers'],
      storage: window.sessionStorage
    }),
    createPersistedState({
      key: 'local',
      paths: ['dialog.dialogTutorial'],
      storage: window.localStorage
    })
  ]
})
