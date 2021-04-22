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
                  Fecha Actualización
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
                <td>{{ item.updated_at }}</td>

                <td>
                  <v-icon
                    medium
                    color="#F50057"
                    @click="openModal('update', item)"
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
        @click="openModal('insert')"
      >
        <v-icon> mdi-plus</v-icon>
      </v-btn>
    </v-card>

    <v-dialog v-model="dialog" persistent max-width="800px">
      <v-card>
        <v-card-title class="headline cyan accent-4">
          <span class="text-md-center white--text justify-center"
            >Formulario usuarios</span
          >
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

              <v-col cols="12" v-if="actionForm == 2">
                <v-select
                  item-text="name"
                  item-value="id"
                  :items="items"
                  label="Cambiar Contraseña*"
                  v-model="checkPassword"
                ></v-select>
              </v-col>
              <v-col cols="12" v-if="checkPassword == 1">
                <v-text-field
                  type="password"
                  label="Nueva Contraseña*"
                  v-model="user.password"
                ></v-text-field>
              </v-col>
              <v-col cols="12" v-if="actionForm == 1">
                <v-text-field
                  type="password"
                  label="Nueva Contraseña*"
                  v-model="user.password"
                ></v-text-field>
              </v-col>
            </v-row>
            <div>
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
                v-for="(errors, index) in errorMessage"
                :key="index"
                v-text="errors"
              >
                {{ errorMessage }}
              </div>
            </div>
            <!-- <pre>{{ user }}</pre> -->
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="dialog = false">
            Cerrar
          </v-btn>
          <v-btn
            v-if="actionForm == 1"
            color="blue darken-1"
            text
            @click="save"
          >
            Guardar
          </v-btn>
          <v-btn
            v-if="actionForm == 2"
            color="blue darken-1"
            text
            @click="update"
          >
            Modificar
          </v-btn>
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
      actionForm: 0,
      actionMessage: {
        agg: "Agregar usuario",
        mod: "Actualizar usuario",
      },
      user: {
        id: 0,
        name: "",
        email: "",
        password: "",
      },
      errorUser: 0,
      errorMessage: [],
      items: [
        { id: 1, name: "Si" },
        { id: 2, name: "No" },
      ],
      checkPassword: 2,
    };
  },
  computed: {
    ...mapState("user", ["listUsers", "message"]),
  },

  methods: {
    validate() {
      this.errorUser = 0;
      this.errorMessage = [];
      if (this.actionForm == 1) {
        if (!this.user.name) {
          this.errorMessage.push("Digite el nombre del usuario");
        }
        if (!this.user.email) {
          this.errorMessage.push("Digite el email del usuario");
        }
        if (!this.user.password) {
          this.errorMessage.push("Digite la contraseña del usuario");
        }
        if (this.errorMessage.length) {
          this.errorUser = 1;
        }
      } else {
        if (!this.user.name) {
          this.errorMessage.push("Digite el nombre del usuario");
        }
        if (!this.user.email) {
          this.errorMessage.push("Digite el email del usuario");
        }
        if (this.checkPassword == 1) {
          if (!this.user.password) {
            this.errorMessage.push("Digite nueva contraseña");
          }
        }
        if (this.errorMessage.length) {
          this.errorUser = 1;
        }
      }

      return this.errorUser;
    },
    openModal(action, data) {
      this.dialog = true;
      switch (action) {
        case "insert":
          this.actionForm = 1;
          this.user.id = 0;
          this.user.name = "";
          this.user.email = "";
          this.user.password = "";
          break;
        case "update":
          this.actionForm = 2;
          this.user.id = data.id;
          this.user.name = data.name;
          this.user.email = data.email;
          this.user.password = data.password;
          break;
        default:
          break;
      }
    },
    save() {
      if (this.validate()) {
        return;
      }
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
    update() {
      if (this.validate()) {
        return;
      }
      this.$store.dispatch("user/updateUser", this.user).then(() => {
        this.$store.dispatch("user/getList");
        this.dialog = false;
      });
    },
  },

  mounted() {
    this.$store.dispatch("user/getList");
  },
};
</script>


