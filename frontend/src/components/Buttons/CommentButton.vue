<template>
  <div>
    <v-btn
      fab
      small
      elevation="1"
      color="white"
      @click.stop="openDialog()"
      @mouseover="mouseover()"
      @mouseleave="mouseleave()"
    >
      <v-icon v-if="isCommenting" color="success">mdi-message</v-icon>
      <v-icon v-else :color="color">{{ icon }}</v-icon>
      <counter :spot="spot" :target="'comments'" />
    </v-btn>

    <v-dialog v-model="dialog" width="600">
      <v-card>
        <spot-detail-comment-panel :spot="spot" />
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SpotDetailCommentPanel from '@/components/Spot/SpotDetailCommentPanel.vue'
import Counter from '@/components/Buttons/Counter.vue'

export default {
  props: {
    spot: Object
  },

  components: {
    Counter,
    SpotDetailCommentPanel
  },

  data() {
    return {
      icon: 'mdi-message',
      color: '#757575',
      dialog: false
    }
  },

  computed: {
    ...mapGetters(['currentUser', 'isLoggingIn']),

    isCommenting() {
      return this.yourComments.length > 0 ? true : false
    },

    yourComments() {
      return this.spot.hasYourVote('comments', this.currentUser.data.id)
    }
  },

  methods: {
    openDialog() {
      this.dialog = true
    },

    mouseover() {
      this.icon = 'mdi-message'
      this.color = 'success'
    },

    mouseleave() {
      this.icon = 'mdi-message'
      this.color = '#757575'
    }
  }
}
</script>

<style scoped>
button::before {
  background-color: white;
}
</style>
