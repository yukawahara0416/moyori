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
    spot: Object
  },

  data() {
    return {
      content: '',
      errors: [],
      image: null
    }
  },

  computed: {
    ...mapGetters(['isLoggingIn', 'tab']),

    isPostedSpot() {
      return Object.prototype.hasOwnProperty.call(this.spot.data, 'id')
    }
  },

  methods: {
    ...mapActions({ saveSpot: 'map/saveSpot' }),
    ...mapActions(['postComment', 'pushSnackbar']),

    commentHandler: async function() {
      let spot = this.spot

      if (this.isLoggingIn == false) {
        this.$store.dispatch('dialogOn', 'dialogSign')
        this.pushSnackbar({ message: 'ログインしてください', color: 'error' })
        return
      }

      if (this.isPostedSpot == false) {
        spot = await this.saveSpot(spot)
      }

      await this.postComment({
        spot: spot,
        content: this.content,
        image: this.image,
        active_tab: this.tab
      })

      this.clearForm()
      this.closeDialog()
    },

    closeDialog() {
      this.$emit('closeDialog')
    },

    clearForm() {
      this.content = ''
      this.image = null
    }
  }
}
</script>
