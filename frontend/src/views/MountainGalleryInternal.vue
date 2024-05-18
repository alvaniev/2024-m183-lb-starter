<template>
  <v-container fluid>
    <v-row>
      <v-col v-for="mnt in mnts" :key="mnt" cols="12" sm="6" md="4" lg="3">
        <app-mountain :mntId="mnt"></app-mountain>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Mountain from "@/components/MountainInternal.vue";
import { computed } from "vue";
import appdata from "@/assets/appdata.json";


export default {
  setup() {
    const mnts = computed(() => appdata.mountains.features.map((item) => item.properties.id));

    return { mnts };
  },

  components: {
    "app-mountain": Mountain,
  },
};
</script>

<style scoped></style>
