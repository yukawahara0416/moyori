import { axiosBase } from '@/plugins/axios.js'
import router from '@/router'

export default {
  actions: {
    postComment(context, { spot, form_data, active_tab }) {
      axiosBase
        .post('/api/v1/comments', form_data, {
          headers: context.rootState.auth.headers
        })
        .then(response => {
          if (router.currentRoute.name == 'search')
            context.commit('spot/pushDataSpotsStore', {
              spot: spot,
              data: response.data,
              genre: 'comments'
            })

          if (router.currentRoute.name == 'profile')
            context.commit('user/addDataUserStore', {
              spot: spot,
              data: response.data,
              active_tab: active_tab,
              genre: 'comments'
            })

          context.dispatch('pushSnackbar', {
            message: 'コメントを投稿しました ありがとうございます！',
            color: 'success'
          })
        })
        .catch(() => {
          context.dispatch('pushSnackbar', {
            message: 'コメントの投稿に失敗しました',
            color: 'error'
          })
        })
    },

    deleteComment(context, { spot, comment, active_tab }) {
      const params = { id: comment.data.id }
      axiosBase
        .delete('/api/v1/comments/' + params.id, {
          headers: context.rootState.auth.headers
        })
        .then(response => {
          if (router.currentRoute.name == 'search')
            context.commit('spot/deleteDataSpotsStore', {
              spot: spot,
              data: response.data,
              genre: 'comments'
            })

          if (router.currentRoute.name == 'profile')
            context.commit('user/deleteDataUserStore', {
              spot: spot,
              data: response.data,
              active_tab: active_tab,
              genre: 'comments'
            })

          context.dispatch('pushSnackbar', {
            message: 'コメントを削除しました',
            color: 'success'
          })
        })
        .catch(() => {
          context.dispatch('pushSnackbar', {
            message: 'コメントの削除に失敗しました',
            color: 'error'
          })
        })
    }
  }
}
