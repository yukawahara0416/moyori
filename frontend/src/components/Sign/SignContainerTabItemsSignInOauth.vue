<template>
  <v-col>
    <v-card class="mx-5">
      <v-toolbar class="white--text" color="primary" dense flat>
        SNSアカウントでログイン
      </v-toolbar>
      <v-card-actions>
        <v-row align="center" justify="center" class="row-default">
          <v-btn
            class="my-3 white--text"
            color="#00acee"
            type="submit"
            @click.stop="signIn(signInFormData)"
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
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters(['signInFormData'])
  },

  methods: {
    ...mapActions(['signIn'])
  }
}
</script>

<style scoped>
.row-default {
  flex-direction: column;
}
</style>
