<template>
  <v-card class="mb-2 pa-3">
    <ValidationObserver ref="observer" v-slot="{ invalid }" immediate>
      <v-form>
        <ValidationProvider
          name="コメント"
          rules="required|max:300"
          v-slot="{ errors, valid }"
        >
          <v-textarea
            autofocus
            label="コメント*"
            name="comment"
            prepend-icon="mdi-comment"
            rows="5"
            required
            type="text"
            v-model="content"
            :clearable="true"
            :error-messages="errors"
            :success="valid"
          />
        </ValidationProvider>

        <ValidationProvider
          name="画像"
          rules="image"
          v-slot="{ errors, valid }"
        >
          <v-file-input
            chips
            counter
            label="画像"
            name="comment"
            prepend-icon="mdi-camera"
            show-size
            v-model="image"
            :clearable="true"
            :error="errors.length > 0"
            :error-messages="errors"
            :success="valid"
          />
        </ValidationProvider>
      </v-form>

      <v-card-actions>
        <v-spacer />

        <v-btn
          color="primary"
          type="submit"
          @click="commentHandler()"
          :disabled="invalid"
        >
          コメント
        </v-btn>

        <v-spacer />
      </v-card-actions>
    </ValidationObserver>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    spot: Object,
    type: String,
    dialog: Boolean
  },

  data() {
    return {
      content: '',
      errors: [],
      image: null
    }
  },

  computed: {
    ...mapGetters(['isLoggingIn', 'dialogSign'])
  },

  methods: {
    ...mapActions({ saveSpot: 'map/saveSpot' }),
    ...mapActions(['postComment', 'pushSnackbar']),

    commentHandler: async function() {
      const spot = this.spot
      const type = this.type
      const isPosted = Object.prototype.hasOwnProperty.call(
        this.spot.data,
        'id'
      )
      if (this.isLoggingIn) {
        if (isPosted) {
          await this.postComment({
            spot: spot,
            content: this.content,
            image: this.image,
            type: type
          })
          this.content = ''
          this.image = null
          this.closeDialog()
        } else {
          const result = await this.saveSpot({ spot: spot })
          await this.postComment({
            spot: result,
            content: this.content,
            image: this.image,
            type: type
          })
          this.content = ''
          this.image = null
          this.closeDialog()
        }
      } else {
        this.pushSnackbar({ message: 'ログインしてください', color: 'error' })
      }
    },

    closeDialog() {
      this.$emit('closeDialog')
    }
  }
}
</script>
