import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import UsersTable from "../views/UsersTable.vue";
import UsersDataTable from "../views/UsersDataTable.vue";
import HelloWorld from "../views/HelloWorld.vue";
import Counter from "../views/Counter.vue";
import Carousel from "../views/Carousel.vue";
import MountainGalleryInternal from "../views/MountainGalleryInternal.vue";
import MountainDetailInternal from "../views/MountainDetailInternal.vue";
import MountainGallery from "../views/MountainGallery.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import FileInput from "../views/FileInput.vue";
// import MountainDetailInternal from "../components/MountainDetailInternal.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "hello-world",
      component: HelloWorld,
    },
    {
      path: "/counter",
      name: "counter",
      component: Counter,
    },
    {
      path: "/carousel",
      name: "carousel",
      component: Carousel,
    },

    {
      path: "/users-table",
      name: "users-table",
      component: UsersTable,
    },
    {
      path: "/users-data-table",
      name: "users-data-table",
      component: UsersDataTable,
    },
    {
      path: "/int/mountains",
      name: "mountains-internal",
      component: MountainGalleryInternal,
    },
    {
      path: "/int/mountains/:id",
      name: "mountains-detail-internal",
      component: MountainDetailInternal,
    },
    {
      path: "/mountains",
      name: "mountains",
      component: MountainGallery,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/signup",
      name: "signup",
      component: Signup,
    },
    {
      path: "/fi",
      name: "fi",
      component: FileInput,
    },
  ],
});

export default router;
