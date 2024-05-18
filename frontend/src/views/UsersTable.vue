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
          <v-card-title>Benutzer</v-card-title>
          <v-card-item>
            <v-table>
              <thead>
                <tr>
                  <th v-for="header in headers" :key="header.key">
                    {{ header.title }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in users" :key="user.id">
                  <td>{{ user.id }}</td>
                  <td>{{ user.name }}</td>
                  <td>{{ user.email }}</td>
                  <td>{{ user.address.zipcode }}</td>
                  <td>{{ user.address.city }}</td>
                </tr>
              </tbody>
            </v-table>
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
