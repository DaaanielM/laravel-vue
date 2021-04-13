<template>
  <div>
    <v-card>
      <v-container>
        <h1
          style="
            text-align: center;
            letter-spacing: 2px;
            color: #26c6da;
            text-transform: uppercase;
            padding: 20px;
          "
        >
          registros usuarios
        </h1>
        <v-simple-table dark>
          <template v-slot:default>
            <thead>
              <tr>
                <th
                  class="text-center"
                  style="color: #26c6da; font-weight: bold; font-size: 18px"
                >
                  Nombre
                </th>
                <th
                  class="text-center"
                  style="color: #26c6da; font-weight: bold; font-size: 18px"
                >
                  Email
                </th>
                <th
                  class="text-center"
                  style="color: #26c6da; font-weight: bold; font-size: 18px"
                >
                  Fecha Creación
                </th>
                <th
                  class="text-center"
                  style="color: #26c6da; font-weight: bold; font-size: 18px"
                >
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in listUsers" :key="item.id" class="text-center">
                <td>{{ item.name }}</td>
                <td>{{ item.email }}</td>
                <td>{{ item.created_at }}</td>
                <td>
                  <v-icon medium color="#F50057" @click="dialog = true"
                    >mdi-pencil</v-icon
                  >
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-container>
      <v-btn
        style="
          color: white;
          width: 10%;
          margin-left: 45%;
          padding: 10px;
          margin-bottom: 10px;
        "
        color="#00C853"
        elevation="20"
        fab
        rounded
        small
        @click="dialog = true"
      >
        <v-icon> mdi-plus</v-icon>
      </v-btn>
    </v-card>

    <v-dialog v-model="dialog" persistent max-width="800px">
      <v-card>
        <v-card-title class="headline cyan accent-4">
          <span class="headline white--text">Agregar Usuario</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Nombre*"
                  v-model="user.name"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Email*"
                  v-model="user.email"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  type="password"
                  label="Contraseña*"
                  v-model="user.password"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <div class="">
              <div
                style="
                  text-align: center;
                  color: red;
                  font-size: 16px;
                  display: flex;
                  justify-content: center;
                  font-weight: bold;
                "
                class="marquee"
              >
                <tr v-for="res in errorMessage">
                  <td>
                    <MARQUEE v-for="item in res"> {{ item }}</MARQUEE>
                  </td>
                </tr>
              </div>
            </div>
            <pre>{{ user }}</pre>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="dialog = false">
            Cerrar
          </v-btn>
          <v-btn color="blue darken-1" text @click="save"> Guardar </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<style>
</style>


<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      dialog: false,
      user: {
        name: "",
        email: "",
        password: "",
      },
      errorMessage: "",
    };
  },
  computed: {
    ...mapState("user", ["listUsers", "message"]),
  },

  methods: {
    save() {
      this.$store
        .dispatch("user/saveUser", this.user)
        .then(() => {
          this.$store.dispatch("user/getList");
          this.dialog = false;
        })
        .catch((err) => {
          console.log(err.response.data.errors);
          if (err.response.status === 422) {
            this.errorMessage = err.response.data.errors;
          }
        });
    },
  },

  mounted() {
    this.$store.dispatch("user/getList");
  },
};
</script>


