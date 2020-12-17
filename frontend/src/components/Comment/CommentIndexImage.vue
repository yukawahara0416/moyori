<template>
  <span>
    <v-img
      alt="スポット写真"
      width="70px"
      :src="comment.image"
      @click="openDialog()"
    >
      <template v-slot:placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-progress-circular indeterminate color="success lighten-5" />
        </v-row>
      </template>
    </v-img>

    <v-dialog v-model="dialog" width="600">
      <comment-index-image-dialog :comment="comment" />
    </v-dialog>
  </span>
</template>

<script>
import CommentIndexImageDialog from '@/components/Comment/CommentIndexImageDialog.vue'

export default {
  props: {
    comment: Object
  },

  components: {
    CommentIndexImageDialog
  },

  data() {
    return {
      dialog: false
    }
  },

  methods: {
    openDialog() {
      this.dialog = true
    }
  }
}
</script>
