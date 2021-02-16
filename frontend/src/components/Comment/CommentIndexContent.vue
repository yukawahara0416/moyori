<template>
  <v-card-text class="pb-0">
    <v-row>
      <v-col :cols="isImageExist(comment) ? 10 : 12" class="py-0">
        <p class="mx-3" v-if="readMore">
          {{ comment.content.slice(0, maxChar) }}

          <a @click.stop="activateReadMore()" href="#">
            ...続きをよむ
          </a>
        </p>
        <p class="mx-3" v-else>
          {{ comment.content }}
        </p>
      </v-col>

      <v-col v-if="isImageExist(comment)" cols="2" class="pa-0">
        <comment-index-image :comment="comment" />
      </v-col>
    </v-row>
  </v-card-text>
</template>

<script>
import CommentIndexImage from '@/components/Comment/CommentIndexImage.vue'

export default {
  props: {
    comment: {
      type: Object,
      default: () => {
        return {}
      },
      required: true
    }
  },

  components: {
    CommentIndexImage
  },

  data() {
    return {
      readMoreToggle: false,
      maxChar: 100
    }
  },

  computed: {
    isImageExist() {
      return function(comment) {
        return comment.image !== null
      }
    },

    isAboveLimit() {
      return this.comment.content.length > this.maxChar
    },

    readMore() {
      if (this.isAboveLimit && !this.readMoreToggle) {
        return true
      } else {
        return false
      }
    }
  },

  methods: {
    activateReadMore() {
      this.readMoreToggle = true
    }
  }
}
</script>
