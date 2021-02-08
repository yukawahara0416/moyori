<template>
  <v-toolbar class="white--text" color="primary" dense flat>
    スポット詳細
    <v-spacer />

    <v-btn icon @click.stop="closeDialog()">
      <v-icon class="white--text">mdi-close</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
export default {
  methods: {
    closeDialog() {
      this.$emit('closeDialog')
    }
  }
}
</script>
