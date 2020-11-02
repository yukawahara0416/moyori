<template>
  <span>
    <v-btn color="primary" type="submit" text @click.stop="dialogOn">
      <v-icon>mdi-pencil</v-icon>
      スポットを編集する
    </v-btn>

    <v-dialog persistent v-model="dialog" width="600">
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
        this.$store.dispatch('dialogOff', 'dialogSpotEdit')
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
