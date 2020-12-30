<template>
  <v-col class="text-center">
    <p class="mb-0">
      <router-link to="/rules" @click.native="closeDialog()">
        利用規約
      </router-link>
      及び
      <router-link to="privacy" @click.native="closeDialog()">
        プライバシーポリシー
      </router-link>
      に
      <br />
      同意の上ご利用ください
    </p>
  </v-col>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
}
</script>
