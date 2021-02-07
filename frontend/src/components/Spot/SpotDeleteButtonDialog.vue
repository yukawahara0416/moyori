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
import { axiosBase } from '@/plugins/axios.js'
export default {
  props: {
    spot: Object
  },

  methods: {
    deleteHandler() {
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
  }
}
</script>
