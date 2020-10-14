<template>
  <span>
    <v-card class="ma-4" flat v-for="(comment, id) in spot.comments" :key="id">
      <v-btn icon>
        <v-avatar class="white--text headline" color="success" size="36">
          <img alt="" src="" v-if="comment.user_image" />
          <span class="white--text headline" v-else>
            {{ comment.user_name.slice(0, 1) }}
          </span>
        </v-avatar>
      </v-btn>
      <span class="ml-2">{{ comment.user_name }} さん</span>
      <span class="ml-2">
        {{ daytime(comment.created_at) }}
      </span>
      <span v-if="currentUser && comment.user_id == currentUser.data.id">
        <span class="ml-2">
          <a href="#" @click="deleteComment({ spot, comment, type })">
            削除する
          </a>
        </span>
      </span>
      <p class="mx-3">{{ comment.content }}</p>
    </v-card>
  </span>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    spot: Object,
    type: String
  },

  computed: {
    ...mapGetters(['currentUser']),

    daytime() {
      return function(created_at) {
        const position = created_at.indexOf('T')
        return created_at.substring(0, position)
      }
    }
  },

  methods: {
    ...mapActions(['deleteComment'])
  }
}
</script>

<style></style>
