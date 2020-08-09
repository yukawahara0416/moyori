<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" width="600">
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon v-if="isCommented" color="success">mdi-message</v-icon>
          <v-icon v-if="!isCommented">mdi-message-outline</v-icon>
          <counter :spot="spot" :genre="'comments'" />
        </v-btn>
      </template>

      <comment-button-dialog
        :spot="spot"
        :type="type"
        :is-logged-in="isLoggedIn"
      />
    </v-dialog>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
import CommentButtonDialog from '@/components/Buttons/CommentButtonDialog.vue'
import Counter from '@/components/Buttons/Counter.vue'

export default {
  props: {
    spot: Object,
    type: String
  },

  components: {
    Counter,
    CommentButtonDialog
  },

  data() {
    return {
      dialog: false
    }
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
  }
}
</script>
