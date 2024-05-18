<template>
  <v-app id="foofoo">
    <v-app-bar color="primary" density="compact">
      <template #prepend>
        <v-app-bar-nav-icon @click.stop="swap"> </v-app-bar-nav-icon>
      </template>

      <v-toolbar-title> Playground </v-toolbar-title>

      <v-spacer></v-spacer>

      <div v-if="isAuthenticated">
        <span class="mr-2 body-2 font-weight-light text-none"
          >{{ firstname }} {{ lastname }}</span
        >
        <v-avatar>
          <img :src="avatar" width="25" />
          <!-- <img :src="require('@/assets/' + avatar)" width="25" /> -->
        </v-avatar>
        <v-btn text @click="logout">
          <span class="mr-2 body-1 font-weight-light text-none">Logout</span>
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </div>
      <div v-else>
        <v-btn text :to="{ name: 'signup' }" class="mx-2">
          <span class="mr-2 body-1 font-weight-light text-none">Sign Up</span>
          <v-icon>mdi-account-plus</v-icon>
        </v-btn>
        <v-btn text :to="{ name: 'login' }" class="mx-2">
          <span class="mr-2 body-1 font-weight-light text-none">Login</span>
          <v-icon>mdi-login</v-icon>
        </v-btn>
      </div>

      <v-toolbar-items>
        <v-menu v-for="ni in navitems" :key="ni.title">
          <template #activator="{ props }">
            <v-btn v-bind="props">
              {{ ni.title }}
            </v-btn>
          </template>
          <v-list density="compact">
            <v-list-item
              v-for="mi in ni.menuitems"
              :key="mi.title"
              :to="mi.action"
            >
              <v-list-item-title>{{ mi.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar-items>
      <v-snackbar
        v-model="isAlertOn"
        location="top"
        :color="alertcolor"
        timeout="3000"
      >
        <template #actions
          ><v-btn variant="text" @click="close" right>Close</v-btn></template
        >
        {{ alertmsg }}
      </v-snackbar>
    </v-app-bar>

    <v-navigation-drawer v-model="isVisible">
      <v-list nav density="compact">
        <v-list-group
          v-for="ni in navitems"
          :key="ni.title"
          collapse-icon="mdi-magnify"
          expand-icon="mdi-magnify"
        >
          <template #activator="{ props }">
            <v-list-subheader v-bind="props">{{ ni.title }}</v-list-subheader>
          </template>
          <v-list-item
            v-for="mi in ni.menuitems"
            :key="mi.title"
            :to="mi.action"
          >
            <v-list-item-title>{{ mi.title }}</v-list-item-title>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useErrorStore } from "./stores/error.js";
import { useUserStore } from "./stores/user.js";
import { useRouter } from "vue-router";

export default {
  setup() {
    const { isAlertOn, alertmsg, alertcolor } = storeToRefs(useErrorStore());
    const { firstname, lastname, avatar, isAuthenticated } = storeToRefs(
      useUserStore()
    );
    const { $reset } = useUserStore();
    const router = useRouter();

    const isVisible = ref(false);
    const navitems = ref([
      {
        title: "My Examples",
        icon: "mdi-account-box",
        menuitems: [
          {
            title: "Mountain Gallery (internal)",
            action: "/int/mountains",
          },
          {
            title: "Mountain Gallery",
            action: "/mountains",
          },
          {
            title: "Example 3 (empty)",
            action: "/",
          },
          {
            title: "Login",
            action: "/login",
          },
        ],
      },
      {
        title: "Basic Examples",
        icon: "mdi-file-code-outline",
        menuitems: [
          {
            title: "Hello World",
            action: "/",
          },
          {
            title: "Counter",
            action: "/counter",
          },
          {
            title: "Carousel",
            action: "/carousel",
          },
          {
            title: "Vuetify Normal Table",
            action: "/users-table",
          },
          {
            title: "Vuetifay Data Table",
            action: "/users-data-table",
          },
        ],
      },
    ]);

    function swap() {
      isVisible.value = !isVisible.value;
    }

    function close() {
      isAlertOn.value = false;
    }

    function logout() {
      $reset();
      router.push({ name: "login" });
    }

    return {
      isVisible,
      navitems,
      swap,
      isAlertOn,
      alertmsg,
      alertcolor,
      close,
      isAuthenticated,
      firstname,
      lastname,
      avatar,
      logout,
    };
  },
};
</script>
