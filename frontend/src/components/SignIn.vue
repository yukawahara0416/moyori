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
    <v-btn @click="signInAsTestUser1" type="submit">
      テストユーザ１
    </v-btn>
    <v-btn @click="signInAsTestUser2" type="submit">
      テストユーザ２
    </v-btn>
    <v-btn @click="signInAsTestUser3" type="submit">
      テストユーザ３
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
      testUser1: {
        email: 'tester@example.com',
        password: 'password'
      },
      testUser2: {
        email: 'tester-1@example.com',
        password: 'password'
      },
      testUser3: {
        email: 'tester-2@example.com',
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
    signInAsTestUser1() {
      this.$store.dispatch('signIn', this.testUser1)
    },
    signInAsTestUser2() {
      this.$store.dispatch('signIn', this.testUser2)
    },
    signInAsTestUser3() {
      this.$store.dispatch('signIn', this.testUser3)
    },
    signOut() {
      this.$store.dispatch('signOut')
    }
  }
}
</script>
