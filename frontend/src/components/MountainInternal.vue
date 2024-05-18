<template>
  <v-card>
    <v-img :src="mntImgUrl" />
    <v-card-title>
      {{ mnt.name }}
    </v-card-title>
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
import { computed } from "vue";
import useMountainInternal from "@/hooks/mountainsInternal.js";

export default {
  setup(props) {
    const { mnt, mntImgUrl } = useMountainInternal(props.mntId);

    const link = computed(() => `mountains/${props.mntId}`);

    return { mnt, mntImgUrl, link };
  },

  props: {
    mntId: String,
  },
};
</script>

<style scoped></style>
