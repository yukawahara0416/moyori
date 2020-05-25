<template>
  <div>
    <GmapMarker
      v-for="(m, id) in markers"
      :key="id"
      :icon="m.icon"
      :position="m.position"
      :title="m.name"
    />
  </div>
</template>

<script>
export default {
  props: {
    markers: {
      type: Array,
      default: () => [],
      required: false
    }
  }
}
</script>
