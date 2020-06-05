<template>
  <div>
    <h2>SignIn</h2>
    <input type="text" v-model="signInFormData.email" placeholder="email" />
    <input
      type="text"
      v-model="signInFormData.password"
      placeholder="password"
    />
    <button type="submit" v-on:click="signIn">ログイン</button>
    <div>{{ signInFormData }}</div>
    <button v-show="currentUser" type="submit" v-on:click="signOut">
      ログアウト
    </button>
  </div>
</template>

<script>
export default {}
</script>
