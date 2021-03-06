<template>
  <v-card>
    <v-card-title class="headline">
      スポットを削除しますか？
    </v-card-title>
    <v-card-text>この操作は取り消すことができません。</v-card-text>

    <v-card-actions>
      <v-spacer />

      <v-btn @click="closeDeleteDialog()" color="green darken-1" text>
        キャンセル
      </v-btn>

      <v-btn @click="deleteHandler()" color="error darken-1" text>
        削除する
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { Spot } from '@/class/Spot.js'
import { axiosBase } from '@/plugins/axios.js'
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  props: {
    spot: {
      type: Object,
      default: () => {
        return new Spot()
      },
      required: true
    }
  },

  computed: {
    ...mapGetters(['headers'])
  },

  methods: {
    ...mapMutations({ deleteSpotSpotStore: 'spot/deleteSpot' }),
    ...mapActions(['pushSnackbarSuccess', 'pushSnackbarError']),
    ...mapActions({ deleteSpotUserStore: 'user/deleteSpot' }),

    deleteHandler: async function() {
      try {
        const spot_id = await this.deleteSpot(this.spot.data.id, this.headers)

        this.closeDeleteDialog()
        this.closeDetailDialog()

        this.storeMutation(spot_id)

        this.pushSnackbarSuccess({ message: 'スポットを削除しました' })
      } catch (error) {
        this.pushSnackbarError({ message: error })
      }
    },

    deleteSpot(id, headers) {
      return axiosBase
        .delete(`/api/v1/spots/${id}`, { headers })
        .then(response => {
          return response.data.id
        })
        .catch(() => {
          throw new Error('スポットの削除に失敗しました')
        })
    },

    closeDeleteDialog() {
      this.$emit('closeDeleteDialog')
    },

    closeDetailDialog() {
      this.$emit('closeDetailDialog')
    },

    storeMutation(spot_id) {
      this.$route.name === 'profile'
        ? this.deleteSpotUserStore({ spot_id })
        : this.deleteSpotSpotStore(spot_id)
    }
  }
}
</script>
