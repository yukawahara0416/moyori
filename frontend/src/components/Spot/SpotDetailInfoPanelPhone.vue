<template>
  <p class="mb-1">
    <strong>電話番号：</strong>
    <a :href="'tel:' + tel">
      {{ tel }}
    </a>
  </p>
</template>

<script>
import { Spot } from '@/class/Spot.js'

export default {
  props: {
    spot: {
      type: Object,
      default: () => {
        return new Spot()
      },
      required: true
    }
  },

  computed: {
    tel() {
      return this.spot.data.phone
    }
  }
}
</script>
