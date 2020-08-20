<template>
  <v-expansion-panels accordion v-if="spot.detail.opening_hours">
    <v-expansion-panel>
      <v-expansion-panel-header>
        営業時間：
        <span
          v-if="
            spot.detail.opening_hours &&
              spot.detail.opening_hours.isOpen(Date.now())
          "
          class="red--text ml-3"
        >
          営業中
        </span>
        <span v-else class="red--text ml-3">
          営業時間外
        </span>
      </v-expansion-panel-header>

      <v-expansion-panel-content>
        <p class="ml-3" v-for="(day, id) in businessDays" :key="id">
          {{ day }}
        </p>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>

  <p v-else>営業時間：</p>
</template>

<script>
export default {
  props: {
    spot: Object
  },

  computed: {
    businessDays() {
      return this.spot.detail.opening_hours.weekday_text
    }
  }
}
</script>

<style></style>
