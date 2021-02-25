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
      <v-icon left>mdi-pencil</v-icon>
      プロフィール編集
    </v-btn>

    <v-dialog v-model="dialog" width="600">
      <profile-actions-edit-dialog :user="user" @closeDialog="closeDialog()" />
    </v-dialog>
  </span>
</template>

<script>
import ProfileActionsEditDialog from '@/components/Profile/ProfileActionsEditDialog.vue'

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
    ProfileActionsEditDialog
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
