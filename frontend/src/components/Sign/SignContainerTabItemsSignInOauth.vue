<template>
  <v-col>
    <v-card class="mx-5">
      <v-toolbar class="white--text" color="primary" dense flat>
        <v-toolbar-title>SNSアカウントでログイン</v-toolbar-title>
      </v-toolbar>
      <v-card-actions>
        <v-row align="center" justify="center" style="flex-direction: column;">
          <v-btn
            class="my-3 white--text"
            @click.stop="signIn()"
            color="#00acee"
            large
            type="submit"
          >
            <v-icon color="white" left>
              mdi-twitter
            </v-icon>
            Twitterアカウントでログイン
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
    ...mapGetters(['signInFormData'])
  },

  methods: {
    signIn() {
      this.$store.dispatch('signIn', this.signInFormData)
    }

    // signInByTwitter() {}
  }
}
</script>
