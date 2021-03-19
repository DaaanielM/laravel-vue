<template>
  <div>
    <v-card>
      <v-container>
        <v-simple-table dark>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Nombre</th>
                <th class="text-left">Email</th>
                <th class="text-left">Fecha Creación</th>
                <th class="text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in listUsers" :key="item.id">
                <td>{{ item.name }}</td>
                <td>{{ item.email }}</td>
                <td>{{ item.created_at }}</td>
                <td>
                  <v-icon medium color="#00B0FF" @click="dialog = true"
                    >mdi-pencil</v-icon
                  >
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-container>
    </v-card>

    <v-dialog v-model="dialog" persistent max-width="800px">
      <v-card>
        <v-card-title class="headline green accent-4">
          <span class="headline white--text">Editar Usuario</span>
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
                <pre>{{ user }}</pre>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Email*" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Fecha Creación*" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="dialog = false">
            Cerrar
          </v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Actualizar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>



<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      dialog: false,
      user: {
        name: "",
      },
    };
  },
  computed: {
    ...mapState("user", ["listUsers"]),
  },
  mounted() {
    this.$store.dispatch("user/getList");
  },
};
</script>
