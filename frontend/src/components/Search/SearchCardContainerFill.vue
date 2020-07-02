<template>
  <v-row
    align="center"
    class="mx-0"
    justify="center"
    style="height: 100%; background-color: white;"
    v-if="!spots.length"
  >
    <v-col cols="10">
      <p>キーワード検索できます</p>
      <p>現在地に戻ることができます</p>
      <p>地図のサークル内のカフェを検索できます</p>
      <v-img
        class="white--text align-end"
        :src="require('@/assets/search_hint.png')"
      />
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    spots: Array
  }
}
</script>
