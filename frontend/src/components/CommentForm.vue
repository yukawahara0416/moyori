<template>
  <div>
    <v-form @submit.prevent>
      <v-text-field
        label="コメント"
        name="comment"
        type="text"
        v-model="content"
      />
    </v-form>

    <v-btn @click="commentHandler()" type="submit">
      コメント
    </v-btn>
  </div>
</template>

<script>
export default {
  props: {
    spot: Object,
    id: Number
  },

  data() {
    return {
      content: ''
    }
  }
}
</script>

<style></style>
