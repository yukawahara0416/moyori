<template>
  <span>
    <v-dialog persistent v-model="dialog" width="600">
      <template v-slot:activator="{ on }">
        <v-btn
          class="mb-3 px-10"
          color="primary"
          large
          type="submit"
          v-on="on"
          @click.stop="dialogOn"
        >
          スポットを編集する
        </v-btn>
      </template>

      <spot-edit-dialog-form :spot="spot" />
    </v-dialog>
  </span>
</template>

<script>
import { mapGetters } from 'vuex'
import SpotEditDialogForm from '@/components/Spot/SpotEditDialogForm.vue'

export default {
  props: {
    spot: Object
  },

  components: {
    SpotEditDialogForm
  },

  computed: {
    ...mapGetters(['dialogSpotEdit']),

    dialog: {
      get() {
        return this.dialogSpotEdit
      },
      set() {
        this.$store.dispatch('dialogOff')
      }
    }
  },

  methods: {
    dialogOn() {
      this.$store.dispatch('dialogOn', 'dialogSpotEdit')
    }
  }
}
</script>

<style></style>
