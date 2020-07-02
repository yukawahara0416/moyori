<template>
  <v-dialog v-model="dialog" width="400">
    <template v-slot:activator="{ on }">
      <v-btn class="my-3" width="250" v-on="on" @click.stop="dialogOn">
        <v-icon left>mdi-delete</v-icon>
        アカウント削除
      </v-btn>
    </template>

    <profile-actions-buttons-delete-dialog />
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import ProfileActionsButtonsDeleteDialog from '@/components/Profile/ProfileActionsButtonsDeleteDialog.vue'

export default {
  components: {
    ProfileActionsButtonsDeleteDialog
  },

  computed: {
    ...mapGetters(['dialogProfileDelete']),

    dialog: {
      get() {
        return this.dialogProfileDelete
      },
      set() {
        this.$store.dispatch('dialogOff')
      }
    }
  },

  methods: {
    dialogOn() {
      this.$store.dispatch('dialogOn', 'dialogProfileDelete')
    }
  }
}
</script>
