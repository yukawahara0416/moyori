<template>
  <div>
    <h2>SignIn</h2>
    <input type="text" v-model="signInFormData.email" placeholder="email" />
    <input
      type="text"
      v-model="signInFormData.password"
      placeholder="password"
    />
    <button data-test="signin" type="submit" @click="signIn">ログイン</button>
    <div>{{ signInFormData }}</div>
    <button v-show="currentUser" type="submit" @click="signOut">
      ログアウト
    </button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['signInFormData', 'currentUser'])
  },

  methods: {
    signIn() {
      this.$store.dispatch('signIn', this.signInFormData)
    },
    signOut() {
      this.$store.dispatch('signOut')
    }
  }
}
</script>
