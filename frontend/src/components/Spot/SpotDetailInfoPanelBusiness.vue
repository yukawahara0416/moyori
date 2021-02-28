<template>
  <span>
    <p class="mb-1">
      <strong>営業時間：</strong>
      <template v-if="spot.data.opening_hours">
        <span class="mx-3" v-if="readMore">
          {{ businessDays.slice(0, maxChar) }}

          <a @click.stop="activateReadMore()" href="#">
            ...続きをよむ
          </a>
        </span>
        <span class="mx-3" v-else>
          {{ businessDays }}
        </span>
      </template>
    </p>
  </span>
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

  data() {
    return {
      readMoreToggle: false,
      maxChar: 30
    }
  },

  computed: {
    businessDays() {
      let text = ''
      const target = this.spot.data.opening_hours.weekday_text

      for (let i = 0; i < target.length; i++) {
        text = text + target[i] + '、'
      }

      return text
        .slice(0, -1)
        .replace(/曜日/g, '')
        .replace(/:/g, '/')
        .replace(/時/g, ':')
        .replace(/分/g, '')
    },

    isAboveLimit() {
      return this.businessDays.length > this.maxChar
    },

    readMore() {
      if (this.isAboveLimit && !this.readMoreToggle) {
        return true
      } else {
        return false
      }
    }
  },

  methods: {
    activateReadMore() {
      this.readMoreToggle = true
    }
  }
}
</script>
