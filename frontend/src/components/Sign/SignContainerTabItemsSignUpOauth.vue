<template>
  <v-col>
    <v-card class="mx-5">
      <v-toolbar class="white--text" color="primary" dense flat>
        SNSアカウントで登録
      </v-toolbar>
      <v-card-actions>
        <v-row align="center" justify="center" class="row-default">
          <v-btn
            class="my-3 white--text"
            color="#00acee"
            type="submit"
            @click.stop="signUp(signUpFormData)"
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
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['signUpFormData'])
  },

  methods: {
    ...mapActions(['signUp'])
  }
}
</script>

<style scoped>
.row-default {
  flex-direction: column;
}
</style>
