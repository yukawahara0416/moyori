<template>
  <span>
    <p v-if="spot.detail.opening_hours">
      営業時間：
      <span class="ml-3" v-for="(day, id) in businessDays" :key="id">
        {{ day }}
      </span>
    </p>
    <p v-else>営業時間：</p>
  </span>
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
