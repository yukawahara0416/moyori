<template>
  <div class="text-right">
    <v-snackbar :color="color" top v-model="snackbarState">
      {{ message }}
      <v-btn @click.native="snackbarState = false" color="white" text>
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
      snackbarState: false
    }
  },

  created() {
    this.$store.watch(
      state => {
        return state.snackbar.color
      },
      newVal => {
        var color = newVal
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
        var message = newVal
        if (message !== '') {
          this.message = message
          this.snackbarState = true
          this.$store.dispatch('clearSnackMessage')
        }
      }
    )
  }
}
</script>
