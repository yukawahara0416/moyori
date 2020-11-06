<template>
  <v-row justify="center">
    <v-btn icon @click.stop="openDialog()">
      <v-icon v-if="isCommenting" color="success">mdi-message</v-icon>
      <v-icon v-else>mdi-message-outline</v-icon>
      <counter :spot="spot" :genre="'comments'" />
    </v-btn>

    <v-dialog v-model="dialog" width="600">
      <v-card>
        <spot-show-dialog-comment-panel :spot="spot" />
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
import SpotShowDialogCommentPanel from '@/components/Spot/SpotShowDialogCommentPanel.vue'
import Counter from '@/components/Utility/Counter.vue'

export default {
  props: {
    spot: Object
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
    openDialog() {
      this.dialog = true
    }
  }
}
</script>
