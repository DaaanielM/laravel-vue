
<template>
  <v-app id="inspire">
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar class="bg-title" color="#0277BD" dark flat>
                <v-toolbar-title class="title"
                  >Formulario de Acceso</v-toolbar-title
                >

                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Email"
                    name="Email"
                    prepend-icon="mdi-email"
                    type="text"
                    v-model="user.email"
                  />
                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-key"
                    type="password"
                    v-model="user.password"
                  />

                  <div class="text-error">{{ message }}</div>
                  <div
                    class="text-error"
                    v-for="(error, index) in errorMessage"
                    :key="index"
                    v-text="error"
                  ></div>
                </v-form>
              </v-card-text>

              <v-card-actions class="btn">
                <v-btn class="textBtn" color="#0277BD" @click="login"
                  >Ingresar</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

        <script>
import { mapState } from "vuex";
export default {
  data: () => ({
    user: {
      email: "",
      password: "",
    },
  }),

  computed: {
    ...mapState("user", ["message", "errorMessage"]),
  },

  methods: {
    login() {
      this.$store.dispatch("user/getLogin", this.user);
    },
  },
};
</script>

<style>
.div-error {
  display: flex;
  justify-content: center;
}
.text-error {
  color: red !important;
  font-weight: bold;
  text-align: center;
}
.bg-title {
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  width: 100% !important;
}
.title {
  font-size: 20px !important;
  font-weight: bold !important;
  letter-spacing: 1px !important;
  text-transform: uppercase !important;
  margin: auto !important;
}
.btn {
  display: block !important;
  margin: auto !important;
  text-align: center !important;
  padding-bottom: 20px;
}

.textBtn {
  padding: 10px !important;
  color: #fff !important;
  width: 40% !important;
  font-weight: bold;
  margin-bottom: 20px;
  margin: auto !important;
  border-radius: 18px !important;
}

.textBtn:hover {
  background: #ffffff !important;
  color: #46a4c8 !important;
}
</style>
