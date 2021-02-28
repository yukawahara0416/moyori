<template>
  <span>
    <v-btn small color="primary" type="submit" text @click.stop="openDialog()">
      <v-icon>mdi-pencil</v-icon>
      スポットを編集する
    </v-btn>

    <v-dialog persistent v-model="dialog" width="600">
      <spot-edit-dialog-form :spot="spot" />
    </v-dialog>
  </span>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { Spot } from '@/class/Spot.js'
import SpotEditDialogForm from '@/components/Spot/SpotEditDialogForm.vue'

export default {
  props: {
    spot: {
      type: Object,
      default: () => {
        return new Spot()
      },
      required: true
    }
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
        this.dialogOff('dialogSpotEdit')
      }
    }
  },

  methods: {
    ...mapMutations(['dialogOn']),
    ...mapActions(['dialogOff']),

    openDialog() {
      this.dialogOn('dialogSpotEdit')
    }
  }
}
</script>
