<template>
  <div>
    <child-comp @register="getdata"></child-comp>
  </div>
</template>

<script>
import ChildComp from "@/components/Child.vue";
import { ref } from "vue";
export default {
  setup() {
    const username = ref("");
    const lastname = ref("");

    function getdata(user) {
        username.value = user.username;
        lastname.value = user.lastname;
    }
  },
  components: {
    "child-comp": ChildComp,
  },
};
</script>
