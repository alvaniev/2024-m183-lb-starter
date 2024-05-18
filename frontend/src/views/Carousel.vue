<template>
  <div id="container">
    <h1>Images</h1>
    <div>
      <img id="pict" :src="imgUrl[index]" alt="0" />
    </div>
    <!-- execute method "next" at click-event -->
    <v-btn @click="next">Next</v-btn>
  </div>
</template>

<script>

//ref and computed must be imported
import { ref, computed } from "vue";

export default {
  setup() {
    const counter = ref(0);
    const imgUrl = ref([
      "https://images.unsplash.com/photo-1565294346415-dd9884b51e5b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ",
      "https://images.unsplash.com/photo-1565074602450-ccabbd4ed954?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ",
      "https://images.unsplash.com/photo-1565150271841-262d0854c5c6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ",
    ]);

    // compute the array-index depending on counter variable
    const index = computed(() => counter.value % imgUrl.value.length);

    // method to be executed at click-event (add counter)
    function next() {
      counter.value += 1;
    }

    return { imgUrl, index, next };
  },
};
</script>

<style scoped>
#pict {
  height: 144px;
  width: 240px;
}
#container {
  margin-left: 24px;
}
</style>
