<template>
  <div id="container">
    <h1>Click Counter</h1>
    <v-btn @click="add">Add Click</v-btn>
    <p>Click Counts: {{ counter }}</p>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const counter = ref(0);

    function add() {
      counter.value += 1;
    }
    return { counter, add };
  },
};
</script>

<style scoped>
#container {
  margin-left: 24px;
}
</style>
