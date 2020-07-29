<template>
  <div>
    <v-text-field
      class="mx-2"
      hide-details
      label="キーワード検索"
      prepend-icon="mdi-magnify"
      single-line
      type="text"
      v-model="keyword"
      :clearable="true"
      @keydown.enter="textSearch"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      keyword: ''
    }
  },

  methods: {
    textSearch() {
      this.$emit('text-search', this.keyword)
    }
  }
}
</script>
