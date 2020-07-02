<template>
  <v-chip
    class="mx-5 px-5"
    @click:close="chipState = !chipState"
    close
    color="success"
    label
    large
    outlined
    v-if="chipState && $vuetify.breakpoint.mdAndUp"
  >
    つくったひと→
    <v-btn href="https://twitter.com/yu_kawahara0416" icon target="_brank">
      <v-badge avatar bordered overlap>
        <template v-slot:badge>
          <v-avatar>
            <v-img :src="require('@/assets/twitter_mark.png')" />
          </v-avatar>
        </template>

        <v-avatar>
          <v-img :src="require('@/assets/author_image.jpg')" />
        </v-avatar>
      </v-badge>
    </v-btn>

    <v-btn href="https://www.wantedly.com/users/105529007" icon target="_brank">
      <v-avatar>
        <v-img :src="require('@/assets/wantedly_mark.png')" />
      </v-avatar>
    </v-btn>
    <v-btn
      href="https://github.com/yukawahara0416/moyori/blob/master/README.md"
      icon
      target="_blank"
    >
      <v-avatar>
        <v-img :src="require('@/assets/github_mark.png')" />
      </v-avatar>
    </v-btn>
  </v-chip>
</template>

<script>
export default {
  data() {
    return {
      chipState: true
    }
  }
}
</script>
