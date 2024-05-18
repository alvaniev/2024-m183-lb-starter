<script>
export default {
  emits: ["register"],
  setup(prop, ctx) {
    async function login() {

      ctx.emit("register", { username: "dr@bell.org", lastname: "Bell" });

    }

    return { login };
  },
};
</script>

