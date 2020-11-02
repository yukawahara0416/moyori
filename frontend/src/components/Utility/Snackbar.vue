<template>
  <div class="text-right">
    <v-snackbar top v-model="snackbar" :color="color">
      {{ message }}
      <v-btn color="white" text @click.native="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      color: '',
      message: '',
      snackbar: false
    }
  },

  created() {
    this.$store.watch(
      state => {
        return state.snackbar.color
      },
      newVal => {
        const color = newVal
        if (color !== '') {
          this.color = color
        }
      }
    )
    this.$store.watch(
      state => {
        return state.snackbar.message
      },
      newVal => {
        const message = newVal
        if (message !== '') {
          this.message = message
          this.snackbar = true
          this.$store.dispatch('clearSnackbar')
        }
      }
    )
  }
}
</script>
