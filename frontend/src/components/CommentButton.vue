<template>
  <div>
    <v-icon v-if="isCommented.length === 0">mdi-message-outline</v-icon>
    <v-icon v-if="isCommented.length > 0" color="success">mdi-message</v-icon>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    spot: Object,
    id: Number
  },

  computed: {
    ...mapGetters(['spots', 'currentUser']),

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
    }
  }
}
</script>

<style></style>
