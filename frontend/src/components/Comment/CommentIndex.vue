<template>
  <span>
    <v-card class="ma-4" flat v-for="(comment, id) in spot.comments" :key="id">
      <v-card-subtitle class="pa-0">
        <v-btn icon>
          <v-avatar class="white--text headline" color="success" size="24">
            <!-- <img alt="" src="" v-if="comment.comment.user_image" /> -->
            <!-- <span class="white--text headline" v-else> -->
            <span class="white--text headline">
              {{ comment.comment.user_name.slice(0, 1) }}
            </span>
          </v-avatar>
        </v-btn>
        <span class="ml-2">{{ comment.comment.user_name }} さん</span>
        <span class="ml-2">
          {{ daytime(comment.comment.created_at) }}
        </span>
        <template
          v-if="currentUser && comment.comment.user_id == currentUser.data.id"
        >
          <comment-index-delete-button
            :spot="spot"
            :type="type"
            :comment="comment"
          />
        </template>
      </v-card-subtitle>

      <v-card-text class="pb-0">
        <v-row>
          <v-col :cols="comment.image !== null ? 9 : 12" class="py-0">
            <p class="mx-3">{{ comment.comment.content }}</p>
          </v-col>
          <v-col v-if="comment.image !== null" cols="3" class="pa-0">
            <v-dialog v-model="dialog" width="600">
              <template v-slot:activator="{ on }">
                <v-img
                  alt="スポット写真"
                  v-on="on"
                  :src="comment.image !== null ? comment.image : ''"
                  @click="dialog = true"
                >
                  <template v-slot:placeholder>
                    <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center"
                    >
                      <v-progress-circular
                        indeterminate
                        color="success lighten-5"
                      ></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </template>

              <v-card class="pa-2">
                <v-img
                  align="center"
                  :src="comment.image !== null ? comment.image : ''"
                />
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </span>
</template>

<script>
import { mapGetters } from 'vuex'
import CommentIndexDeleteButton from '@/components/Comment/CommentIndexDeleteButton.vue'

export default {
  props: {
    spot: Object,
    type: String
  },

  components: {
    CommentIndexDeleteButton
  },

  data() {
    return {
      dialog: false
    }
  },

  computed: {
    ...mapGetters(['currentUser']),

    image() {
      if (this.comment.image !== null) {
        return this.comment.image
      } else {
        return ''
      }
    },

    daytime() {
      return function(created_at) {
        const position = created_at.indexOf('T')
        return created_at.substring(0, position)
      }
    }
  }
}
</script>
