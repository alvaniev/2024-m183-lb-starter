<template>
  <div id="container">
    <!-- display local state variable "msg" -->
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>

// ref must be imported
// ref enables reactivity of local state variables
// reactivity = update template/view whenever local state variable is changed
import { ref } from "vue";

export default {
  setup() {
    const msg = ref("Hello World");

    // expose local state variable to the template/view
    return { msg };
  },
};
</script>

<style scoped>
h1 {
  color: blue;
}
#container {
  margin-left: 24px;
}
</style>
