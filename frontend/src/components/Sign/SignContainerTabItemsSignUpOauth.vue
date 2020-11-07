<template>
  <v-col>
    <v-card class="mx-5">
      <v-toolbar class="white--text" color="primary" dense flat>
        <v-toolbar-title>SNSアカウントで登録</v-toolbar-title>
      </v-toolbar>
      <v-card-actions>
        <v-row align="center" justify="center" style="flex-direction: column;">
          <v-btn
            class="my-3 white--text"
            @click.stop="signUp()"
            color="#00acee"
            large
            type="submit"
          >
            <v-icon color="white" left>
              mdi-twitter
            </v-icon>
            Twitterアカウントで新規登録
          </v-btn>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['signUpFormData'])
  },

  methods: {
    signUp() {
      this.$store.dispatch('signUp', this.signUpFormData)
    }
  }
}
</script>
