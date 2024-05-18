<template>
  <v-card class="d-flex flex-column">
    <v-card-text>
      <v-card-title>Neuen Berg erfassen:</v-card-title>
      <!-- <v-form> -->
        <v-file-input
          v-model="file"
          label="Datei"
          dense
          clearable
        ></v-file-input>
      <!-- </v-form> -->
<input type="file" :value="f" @input="event => f = event.target.value">
    </v-card-text>

    <v-card-actions class="mt-auto d-flex justify-end" width="100">
      <v-btn icon="mdi-close" @click="cancel"> </v-btn>
      <v-btn icon="mdi-check" @click="save"> </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { ref, reactive } from "vue";
import { useUserStore } from "../stores/user.js";
import useHelpers from "../hooks/helpers.js";
import { storeToRefs } from "pinia";
export default {
  emits: ["cancelNewMnt", "saveNewMnt"],

  setup(porps, { emit }) {
    const { jwt, id: userId, isAuthenticated } = storeToRefs(useUserStore());
    const { checkHttpStatus } = useHelpers();

    const file = ref([]);
    const  f = ref("");

    function cancel() {
      emit("cancelNewMnt");
    }

    async function save() {
      try {
        console.log("start " + JSON.stringify(file.value) + " ");
        let res;
        // step 1: create new mountain object at backend (without image)
        let reqBody = JSON.stringify({
          name: "TestTest",
          elevation: "100",
          longitude: "200",
          longitude: "400",
          hasmountainrailway: false,
        });
        let postReqHeaders = { "Content-Type": "application/json" };
        let putReqHeaders = {};

        // add JWT to request header, if user-specific mountain should be added
        if (isAuthenticated.value) {
          postReqHeaders["Authorization"] = `Bearer ${jwt.value}`;
          putReqHeaders["Authorization"] = `Bearer ${jwt.value}`;
        }

        if (isAuthenticated.value) {
          res = await fetch(
            `${import.meta.env.VITE_BACKEND}/users/${userId.valaue}/mnts`,
            {
              method: "POST",
              headers: postReqHeaders,
              body: reqBody,
            }
          );
        } else {
          res = await fetch(`${import.meta.env.VITE_BACKEND}/mnts`, {
            method: "POST",
            headers: postReqHeaders,
            body: reqBody,
          });
        }

        checkHttpStatus(res);
        let savedMnt = await res.json();

        // step 2: get id of newly created mountain, then upload image
        const mntId = savedMnt.properties.id;
        reqBody = new FormData();
        reqBody.append("image", file.value[0]);
        console.log("formdata: " + JSON.stringify(reqBody));

        if (isAuthenticated.value) {
          res = await fetch(
            `${import.meta.env.VITE_BACKEND}/users/${
              userId.value
            }/mnts/${mntId}/img`,
            {
              method: "PUT",
              body: reqBody,
              headers: putReqHeaders,
            }
          );
        } else {
          res = await fetch(
            `${import.meta.env.VITE_BACKEND}/mnts/${mntId}/img`,
            {
              method: "PUT",
              body: reqBody,
            }
          );
        }

        checkHttpStatus(res);
        savedMnt = await res.json();

        // step 3: notify parent component (gallery component) of newly added mountain
        console.log("emit");
        emit("saveNewMnt", mntId);
      } catch (err) {
        alert(err.message, "error");
      }
    }

    return {
      file,
      f,
      cancel,
      save,
    };
  },
};
</script>

<style scoped>
/* #text {
    height: 100%
  } */
</style>
