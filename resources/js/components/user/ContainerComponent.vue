<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Example Users</div>

          <div class="card-body">Modulos Usuarios {{ listUsers }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("user", ["listUsers"]),
  },
  mounted() {
    this.$store.dispatch("user/getList");
  },
};
</script>
