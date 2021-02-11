import { axiosBase } from '@/plugins/axios.js'

export default {
  actions: {
    vote(context, { prop, spot, params, headers, route, isMyPage, vote_id }) {
      return axiosBase
        .post(`/api/v1/${prop}`, params, { headers })
        .then(response => {
          const vote = response.data
          const place_id = spot.data.place_id

          if (route == 'search')
            context.commit('spot/addVote', { vote, prop, place_id })

          if (route == 'profile' && isMyPage) {
            context.dispatch('user/addSpot', { spot, prop, vote_id })
            context.commit('user/addVote', { vote, prop, place_id })
          }

          if (route == 'profile' && !isMyPage)
            context.commit('user/addVote', { vote, prop, place_id })

          return response
        })
        .catch(() => {
          const arry = keyword(prop)
          throw new Error(`${arry[0]}に失敗しました`)
        })
    },

    unVote(context, { prop, spot, target, headers, route, isMyPage }) {
      return axiosBase
        .delete(`/api/v1/${prop}/${target.id}`, { headers })
        .then(response => {
          const spot_id = response.data.spot_id
          const vote_id = response.data.id
          const place_id = spot.data.place_id

          if (route == 'search')
            context.commit('spot/deleteVote', { vote_id, place_id, prop })

          if (route == 'profile' && isMyPage) {
            context.dispatch('user/deleteSpot', { spot_id, prop })
            context.commit('user/deleteVote', { vote_id, place_id, prop })
          }

          if (route == 'profile' && !isMyPage)
            context.commit('user/deleteVote', { vote_id, place_id, prop })

          return response.data.id
        })
        .catch(() => {
          const arry = keyword(prop)
          throw new Error(`${arry[0]}の${arry[1]}に失敗しました`)
        })
    }
  }
}

// エラーメッセージのキーワードを変更します
function keyword(prop) {
  const obj = {
    likes: ['「いいね」', '取り消し'],
    wifi_withs: ['「Wifiあるよ」', '取り消し'],
    wifi_withouts: ['「Wifiないよ」', '取り消し'],
    power_withs: ['「電源あるよ」', '取り消し'],
    power_withouts: ['「電源ないよ」', '取り消し'],
    comments: ['コメントの投稿', '削除']
  }
  const arry = obj[prop]
  return arry
}
