<template>
  <v-container fluid>
    <v-row dense>
      <v-col cols="12" md="6">
        <v-card class="item">
          <v-img :src="mntImgUrl" />
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-row dense>
          <v-col cols="12">
            <v-card class="item">
              <v-card-title>{{ mnt.name }}</v-card-title>
              <v-list>
                <v-list-item>
                  <v-list-item-title> Höhe: </v-list-item-title>
                  <v-list-item-subtitle> {{ mnt.el }}m </v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title> Bergbahn: </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ hasMR }}
                  </v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>

          <v-col cols="12">
            <v-card class="item">
              <v-card-title>reserved for future use</v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-btn icon="mdi-chevron-left" to="/int/mountains"> </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { computed } from "vue";
import useMountainInternal from "@/hooks/mountainsInternal.js";
import { useRoute } from "vue-router";

export default {
  setup() {
    const route = useRoute();
    const { mnt, mntImgUrl } = useMountainInternal(route.params.id);
    const hasMR = computed(() => (mnt.value.mountainrailway ? "ja" : "nein"));

    return { mnt, mntImgUrl, hasMR };
  },
};
</script>

<style scoped>
.item {
  height: 100%;
}
</style>
