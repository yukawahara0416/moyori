<template>
  <div>
    <v-form @submit.prevent>
      <v-text-field
        label="コメント"
        name="comment"
        type="text"
        v-model="content"
      />
    </v-form>

    <v-btn @click="commentHandler()" type="submit">
      コメント
    </v-btn>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    spot: Object,
    id: Number
  },

  data() {
    return {
      content: ''
    }
  },

  computed: {
    ...mapGetters(['spots', 'headers', 'currentUser']),

    isCommented() {
      const vm = this
      const commented = this.spots[this.id].comments.filter(function(comment) {
        return comment.user_id == vm.currentUser.data.id
      })
      if (vm.currentUser !== null && commented.length > 0) {
        return commented
      } else {
        return []
      }
    }
  }
}
</script>

<style></style>
