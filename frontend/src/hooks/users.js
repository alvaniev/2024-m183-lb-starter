import { ref } from "vue";

export default function useUsers() {
  const headers = ref([
    {
      title: "ID",
      align: "start",
      sortable: true,
      key: "id",
    },
    {
      title: "Name",
      align: "start",
      sortable: true,
      key: "name",
    },
    {
      title: "E-Mail",
      align: "start",
      sortable: true,
      key: "email",
    },
    {
      title: "PLZ",
      align: "start",
      sortable: true,
      key: "address.zipcode",
    },
    {
      title: "Stadt",
      align: "start",
      sortable: true,
      key: "address.city",
    },
  ]);
  const users = ref([]);
  const alert = ref(false);
  const alertmsg = ref("");
  const alertcolor = ref("");
  const search = ref("");
  const itemsPerPage = ref(10);

  async function getUsers() {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      users.value = await res.json();
      if (!res.ok) {
        throw new Error(
          `Fehler: ${res.statusText} - (HTTP-Status: ${res.status})`
        );
      }

      // display snackbar with success message
      alertmsg.value = `Benutzer geladen - (HTTP-Status ${res.status})`;
      alertcolor.value = "success";
      alert.value = true;
    } catch (err) {
      // display snackbar with error message
      alertmsg.value = err.message;
      alertcolor.value = "error";
      alert.value = true;
    }
  }
  function close() {
    alert.value = false;
  }

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
}
