<template>
  <v-dialog v-model="dialog" width="400">
    <template v-slot:activator="{ on }">
      <v-btn class="my-3" width="250" v-on="on" @click.stop="dialogOn">
        <v-icon left>mdi-pencil</v-icon>
        プロフィール編集
      </v-btn>
    </template>

    <profile-actions-buttons-edit-dialog />
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import ProfileActionsButtonsEditDialog from '@/components/Profile/ProfileActionsButtonsEditDialog.vue'

export default {
  components: {
    ProfileActionsButtonsEditDialog
  },

  computed: {
    ...mapGetters(['dialogProfileEdit']),

    dialog: {
      get() {
        return this.dialogProfileEdit
      },
      set() {
        this.$store.dispatch('dialogOff')
      }
    }
  },

  methods: {
    dialogOn() {
      this.$store.dispatch('dialogOn', 'dialogProfileEdit')
    }
  }
}
</script>
