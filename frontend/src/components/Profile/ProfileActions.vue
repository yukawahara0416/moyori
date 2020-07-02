<template>
  <v-col
    class="mb-5"
    cols="8"
    style="background-color: white; border-radius: 4px;"
  >
    <v-row
      align="center"
      justify="center"
      no-gutter
      style="flex-direction: column;"
    >
      <profile-actions-items :user="user" />

      <profile-actions-buttons
        :id="id"
        :user="user"
        :headers="headers"
        :currentUser="currentUser"
      />
    </v-row>
  </v-col>
</template>

<script>
import ProfileActionsItems from '@/components/Profile/ProfileActionsItems.vue'
import ProfileActionsButtons from '@/components/Profile/ProfileActionsButtons.vue'

export default {
  props: {
    id: Number,
    user: Object,
    headers: Object,
    currentUser: Object
  },

  components: {
    ProfileActionsItems,
    ProfileActionsButtons
  }
}
</script>
