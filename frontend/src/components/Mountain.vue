<template>
  <v-card>
    <v-img aspect-ratio="1.6" cover :src="mnt.img" />
    <v-card-title>
      {{ mnt.name }}
    </v-card-title>
    <v-card-text> {{ mnt.description }}</v-card-text>
    <div class="d-flex">
      <v-card-text>Höhe: {{ mnt.el }}m</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn icon="mdi-chevron-right" :to="link"> </v-btn>
      </v-card-actions>
    </div>
  </v-card>
</template>

<script>
import useMountains from "@/hooks/mountains.js";
import { reactive, computed, h } from "vue";

export default {
  setup(props) {
    const { loadMountain } = useMountains();

    const mnt = reactive({
      id: "",
      name: "",
      description: "",
      img: "",
      el: 0,
      hasMountainRailway: false,
    });
    

    (async () => {
      const loadedMnt = await loadMountain(props.mntId);
      mnt.name = loadedMnt.properties.name;
      mnt.description = loadedMnt.properties.description;
      mnt.el = loadedMnt.properties.el;
      mnt.img = loadedMnt.properties.img;
    })();

    const link = computed(() => `mountains`);

    return { mnt, link };
  },
  props: {
    mntId: Number,
  },
};
</script>

<style scoped></style>
