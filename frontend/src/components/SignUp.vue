<template>
  <div>
    <h2>SignUp</h2>
    <input type="text" v-model="signUpFormData.name" placeholder="name" />
    <input type="text" v-model="signUpFormData.email" placeholder="email" />
    <input type="text" v-model="signUpFormData.password" placeholder="password" />
    <input
      type="text"
      v-model="signUpFormData.password_confirmation"
      placeholder="password_confirmation"
    />
    <button type="submit" v-on:click="signUp">アカウント登録</button>
    <div>{{ signUpFormData }}</div>
  </div>
</template>

<script>
export default {}
</script>
