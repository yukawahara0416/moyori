<template>
  <v-dialog v-model="dialog" width="600">
    <template v-slot:activator="{ on }">
      <div v-on="on" @click.stop="dialogOn"></div>
    </template>

    <spot-form-container />
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import SpotFormContainer from '@/components/Spot/SpotFormContainer.vue'

export default {
  components: {
    SpotFormContainer
  },

  computed: {
    ...mapGetters(['dialogSpotCreate']),

    dialog: {
      get() {
        return this.dialogSpotCreate
      },
      set() {
        this.$store.dispatch('dialogOff')
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
