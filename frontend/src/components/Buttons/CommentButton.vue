<template>
  <div>
    <v-btn icon>
      <v-icon v-if="isCommented.length === 0">
        mdi-message-outline
      </v-icon>
      <v-icon v-if="isCommented.length > 0" color="success">
        mdi-message
      </v-icon>
      <counter :spot="spot" :genre="'comments'" />
    </v-btn>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Counter from '@/components/Buttons/Counter.vue'

export default {
  props: {
    spot: Object,
    type: String
  },

  components: {
    Counter
  },

  computed: {
    ...mapGetters(['headers', 'currentUser']),

    isLoggedIn() {
      return this.headers !== null ? true : false
    },

    isCommented() {
      return this.ownComment.length > 0 ? true : false
    },

    ownComment() {
      if (this.isLoggedIn) {
        return this.spot.comments.filter(comment => {
          return comment.user_id == this.currentUser.data.id
        })
      } else {
        return []
      }
    }

    // isCommented() {
    //   const vm = this
    //   const comments = this.spots[this.id].comments
    //   if (vm.currentUser !== null && comments.length > 0) {
    //     const commented = comments.filter(function(comment) {
    //       return comment.user_id == vm.currentUser.data.id
    //     })
    //     return commented
    //   } else {
    //     return []
    //   }
    // }
  }
}
</script>
