<template>
  <v-card class="pa-2">
    <v-img align="center" :src="comment.image" />
  </v-card>
</template>

<script>
export default {
  props: {
    comment: Object
  }
}
</script>
