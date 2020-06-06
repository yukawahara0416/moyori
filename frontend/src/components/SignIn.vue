<template>
  <div>
    <h2>SignIn</h2>
    <input type="text" v-model="signInFormData.email" placeholder="email" />
    <input
      type="text"
      v-model="signInFormData.password"
      placeholder="password"
    />
    <v-btn type="submit" @click="signIn">ログイン</v-btn>
    <v-btn @click="signInAsTestUser" type="submit">
      テストユーザでログイン
    </v-btn>
    <div>{{ signInFormData }}</div>
    <div>{{ currentUser }}</div>
    <v-btn v-show="currentUser" type="submit" @click="signOut">
      ログアウト
    </v-btn>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      testUser: {
        email: 'tester@example.com',
        password: 'password'
      }
    }
  },

  computed: {
    ...mapGetters(['signInFormData', 'currentUser'])
  },

  methods: {
    signIn() {
      this.$store.dispatch('signIn', this.signInFormData)
    },
    signInAsTestUser() {
      this.$store.dispatch('signIn', this.testUser)
    },
    signOut() {
      this.$store.dispatch('signOut')
    }
  }
}
</script>
