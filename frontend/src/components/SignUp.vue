<template>
  <div>
    <h2>SignUp</h2>
    <input type="text" v-model="signUpFormData.name" placeholder="name" />
    <input type="text" v-model="signUpFormData.email" placeholder="email" />
    <input
      type="text"
      v-model="signUpFormData.password"
      placeholder="password"
    />
    <input
      type="text"
      v-model="signUpFormData.password_confirmation"
      placeholder="password_confirmation"
    />
    <button data-test="signup" type="submit" @click="signUp">
      アカウント登録
    </button>
    <div>{{ signUpFormData }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['signUpFormData', 'currentUser'])
  },

  methods: {
    signUp() {
      this.$store.dispatch('signUp', this.signUpFormData)
    }
  }
}
</script>
