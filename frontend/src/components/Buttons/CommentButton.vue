<template>
  <div>
    <v-btn icon>
      <v-icon v-if="isCommented.length === 0">
        mdi-message-outline
      </v-icon>
      <v-icon v-if="isCommented.length > 0" color="success">
        mdi-message
      </v-icon>
      <p>{{ count }}</p>
    </v-btn>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    spot: Object,
    type: String
  },

  computed: {
    ...mapGetters([{ spots: 'spot/spots' }, 'currentUser']),

    isCommented() {
      const vm = this
      const comments = this.spots[this.id].comments
      if (vm.currentUser !== null && comments.length > 0) {
        const commented = comments.filter(function(comment) {
          return comment.user_id == vm.currentUser.data.id
        })
        return commented
      } else {
        return []
      }
    },

    count() {
      const comments = this.spots[this.id].comments
      if (comments.length > 0) {
        return comments.length
      } else {
        return 0
      }
    }
  }
}
</script>
