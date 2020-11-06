<template>
  <span>
    <div @click.stop="openDialog()"></div>

    <v-dialog persistent v-model="dialog" width="600">
      <spot-post-dialog-form />
    </v-dialog>
  </span>
</template>

<script>
import { mapGetters } from 'vuex'
import SpotPostDialogForm from '@/components/Spot/SpotPostDialogForm.vue'

export default {
  components: {
    SpotPostDialogForm
  },

  computed: {
    ...mapGetters(['dialogSpotCreate']),

    dialog: {
      get() {
        return this.dialogSpotCreate
      },
      set() {
        this.$store.dispatch('dialogOff', 'dialogSpotCreate')
      }
    }
  },

  methods: {
    openDialog() {
      this.$store.dispatch('dialogOn', 'dialogSpotCreate')
    }
  }
}
</script>

<style></style>
