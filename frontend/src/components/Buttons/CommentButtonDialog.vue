<template>
  <v-card>
    <v-form @submit.prevent>
      <v-text-field name="comment" type="text" v-model="content" />
    </v-form>

    <v-btn @click="commentHandler()" type="submit">コメント</v-btn>

    <div v-for="(c, id) in spot.comments" :key="id">
      <p>{{ c.content }}</p>
      <v-btn
        type="submit"
        v-if="c.user_id == currentUser.data.id"
        @click="deleteComment(c, id)"
      ></v-btn>
    </div>
  </v-card>
</template>

<script>
export default {}
</script>

<style></style>
