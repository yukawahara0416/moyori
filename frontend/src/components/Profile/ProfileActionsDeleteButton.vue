<template>
  <span>
    <v-btn
      class="my-3"
      max-width="250"
      min-width="160"
      :disabled="isTestUser"
      :small="$vuetify.breakpoint.smAndDown"
      @click.stop="openDialog()"
    >
      <v-icon left>mdi-delete</v-icon>
      アカウント削除
    </v-btn>

    <v-dialog v-model="dialog" width="400">
      <profile-actions-delete-dialog @closeDialog="closeDialog()" />
    </v-dialog>
  </span>
</template>

<script>
import ProfileActionsDeleteDialog from '@/components/Profile/ProfileActionsDeleteDialog.vue'

export default {
  props: {
    id: {
      type: Number,
      default: () => {
        return null
      },
      required: true
    },
    user: {
      type: Object,
      default: () => {
        return {}
      },
      required: true
    }
  },

  components: {
    ProfileActionsDeleteDialog
  },

  data() {
    return {
      dialog: false
    }
  },

  computed: {
    isTestUser() {
      return this.id == 1 ? true : false
    }
  },

  methods: {
    openDialog() {
      this.dialog = true
    },

    closeDialog() {
      this.dialog = false
    }
  }
}
</script>
