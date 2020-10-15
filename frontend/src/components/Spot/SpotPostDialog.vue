<template>
  <v-dialog persistent v-model="dialog" width="600">
    <template v-slot:activator="{ on }">
      <div v-on="on" @click.stop="dialogOn"></div>
    </template>

    <spot-post-dialog-form />
  </v-dialog>
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
    dialogOn() {
      this.$store.dispatch('dialogOn', 'dialogSpotCreate')
    }
  }
}
</script>

<style></style>
