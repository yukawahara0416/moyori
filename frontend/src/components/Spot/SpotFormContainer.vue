<template>
  <v-card>
    <v-row
      align="center"
      justify="center"
      no-gutter
      style="flex-direction: column;"
    >
      <v-col>
        <v-row
          align="center"
          justify="center"
          no-gutter
          style="flex-direction: column;"
        >
          <v-col cols="12" style="background-color: white; border-radius: 4px;">
            <spot-form-container-forms />
            <!-- <sign-container-tabs :tabs="tabs" @changeTabs="changeTabs" /> -->
            <!-- <sign-container-tab-items :tabs="tabs" @changeTabs="changeTabs" /> -->
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import SpotFormContainerForms from '@/components/Spot/SpotFormContainerForms.vue'

export default {
  components: {
    SpotFormContainerForms
  }
}
</script>

<style></style>
