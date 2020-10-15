<template>
  <v-card>
    <v-toolbar class="white--text" color="primary" dense flat>
      <v-toolbar-title>スポットを編集</v-toolbar-title>
    </v-toolbar>

    <v-card-text>
      <v-form>
        <v-text-field
          label="スポット名"
          name="name"
          prepend-icon="mdi-coffee"
          type="text"
          v-model="spot.data.name"
          :clearable="true"
        />

        <v-text-field
          label="住所"
          name="address"
          prepend-icon="mdi-home-circle-outline"
          type="text"
          v-model="spot.data.address"
          :clearable="true"
        />

        <v-text-field
          label="イメージ"
          name="image"
          prepend-icon="mdi-map-marker-outline"
          type="text"
          v-model="spot.data.image"
          :clearable="true"
        />

        <v-text-field
          label="URL"
          name="url"
          prepend-icon="mdi-web"
          type="text"
          v-model="spot.data.url"
          :clearable="true"
        />
      </v-form>
    </v-card-text>

    <v-card-actions>
      <v-spacer />

      <v-btn class="mb-3 px-10" large @click.stop="closeDialog()">
        キャンセル
      </v-btn>

      <v-spacer />

      <v-btn
        class="mb-3 px-10"
        color="primary"
        large
        type="submit"
        @click="editSpot()"
      >
        スポットを編集する
      </v-btn>

      <v-spacer />
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    spot: Object
  },

  methods: {
    editSpot() {
      this.$store.dispatch('post/editSpot', this.spot)
    },

    closeDialog() {
      this.$emit('onCloseDialog')
    }
  }
}
</script>

<style></style>
