<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" width="600">
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon v-if="isCommenting" color="success">mdi-message</v-icon>
          <v-icon v-else>mdi-message-outline</v-icon>
          <counter :spot="spot" :genre="'comments'" />
        </v-btn>
      </template>

      <v-card>
        <spot-show-dialog-comment-panel :spot="spot" :type="type" />
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
import SpotShowDialogCommentPanel from '@/components/Spot/SpotShowDialogCommentPanel.vue'
import Counter from '@/components/Buttons/Counter.vue'

export default {
  props: {
    spot: Object,
    type: String
  },

  components: {
    Counter,
    SpotShowDialogCommentPanel
  },

  data() {
    return {
      dialog: false
    }
  },

  computed: {
    ...mapGetters(['currentUser', 'isLoggingIn']),

    isCommenting() {
      return this.commentsByCurrentUser.length > 0 ? true : false
    },

    commentsByCurrentUser() {
      if (this.spot.comments.length == 0) return []
      if (this.isLoggingIn == false) return []

      return this.spot.comments.filter(comment => {
        return comment.data.user_id == this.currentUser.data.id
      })
    }
  },

  methods: {
    closeDialog() {
      this.dialog = false
    }
  }
}
</script>
