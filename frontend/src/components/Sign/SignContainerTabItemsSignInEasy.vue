<template>
  <v-col>
    <v-card class="mx-5">
      <v-toolbar class="white--text" color="success" dense flat>
        <v-toolbar-title>かんたんログイン</v-toolbar-title>
      </v-toolbar>
      <v-card-actions>
        <v-row align="center" justify="center">
          <v-col class="text-center">
            <v-btn
              color="success"
              @click.stop="signInAsTestUser()"
              large
              type="submit"
            >
              <v-icon left>mdi-ninja</v-icon>
              テストユーザでログイン
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
export default {
  data() {
    return {
      testUser: {
        email: 'tester@example.com',
        password: 'password'
      }
    }
  },

  methods: {
    signInAsTestUser() {
      this.$store.dispatch('signIn', this.testUser)
    }
  }
}
</script>
