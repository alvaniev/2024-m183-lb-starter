<template>
  <v-container fluid>
    <v-snackbar v-model="alert" location="top" :color="alertcolor"
      >{{ alertmsg }}
      <template #actions
        ><v-btn variant="text" @click="close" right>Close</v-btn></template
      >
    </v-snackbar>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title> Benutzer </v-card-title>
          <v-card-item>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Suche"
              single-line
              hide-details
            ></v-text-field>
          </v-card-item>
          <v-card-item>
            <v-data-table
              :headers="headers"
              :items="users"
              :search="search"
            ></v-data-table>
          </v-card-item>
          <v-card-actions
            ><v-btn color="primary" @click="getUsers"
              >Benutzer laden</v-btn
            ></v-card-actions
          >
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import useUsers from "../hooks/users.js";

export default {
  setup() {
    const {
      headers,
      users,
      alert,
      alertmsg,
      alertcolor,
      search,
      itemsPerPage,
      close,
      getUsers,
    } = useUsers();

    return {
      headers,
      users,
      alert,
      alertmsg,
      alertcolor,
      search,
      itemsPerPage,
      close,
      getUsers,
    };
  },
};
</script>

<style></style>
