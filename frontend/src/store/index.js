import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import spot from '@/store/modules/spot/spot.js'
import map from '@/store/modules/spot/map.js'
import post from '@/store/modules/spot/post.js'
import format from '@/store/modules/spot/format.js'

import auth from '@/store/modules/user/auth.js'
import user from '@/store/modules/user/user.js'

import dialog from '@/store/modules/utility/dialog.js'
import snackbar from '@/store/modules/utility/snackbar.js'
import loading from '@/store/modules/utility/loading.js'

import like from '@/store/modules/button/like.js'
import wifiWith from '@/store/modules/button/wifiWith.js'
import wifiWithout from '@/store/modules/button/wifiWithout.js'
import powerWith from '@/store/modules/button/powerWith.js'
import powerWithout from '@/store/modules/button/powerWithout.js'
import comment from '@/store/modules/button/comment.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    spot: spot,
    map: map,
    post: post,
    format: format,

    auth,
    user: user,

    dialog,
    snackbar,
    loading,

    like,
    wifiWith,
    wifiWithout,
    powerWith,
    powerWithout,
    comment
  },

  plugins: [
    createPersistedState({
      paths: ['auth.currentUser', 'auth.headers'],
      storage: window.sessionStorage
    })
  ]
})
