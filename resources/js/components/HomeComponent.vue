                            <template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item link color="#0277BD" to="/example">
          <v-list-item-action>
            <v-icon color="#0277BD">mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Menu</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-group
          :prepend-icon="model ? 'mdi-chevron-up' : 'mdi-chevron-down'"
          append-icon=""
          color="#0277BD"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title> Inventario </v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item link color="#0277BD" to="/product">
            <v-list-item-action>
              <v-icon>mdi-shopping</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title> Productos</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>

        <v-list-group
          :prepend-icon="model ? 'mdi-chevron-up' : 'mdi-chevron-down'"
          append-icon=""
          color="#0277BD"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title> Acceso </v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item link color="#0277BD" to="/user">
            <v-list-item-action>
              <v-icon>mdi-account</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title> Usuarios </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>

        <v-list-item link @click="logout">
          <v-list-item-action>
            <v-icon color="#FF1744">mdi-power</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Cerrar Sesión</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="#0277BD" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
    <v-footer class="footer" app color="#0277BD" dark>
      <span class="white--text">DANIEL BRAND - &copy; 2021</span>
    </v-footer>
  </v-app>
</template>
                            <script>
export default {
  props: {
    source: String,
  },
  data: () => ({
    token: "",
    dialog: false,
    drawer: true,
    model: false,
  }),
  methods: {
    logout() {
      this.$store.dispatch("user/getLogout");
    },
  },
  created() {
    this.token = localStorage.getItem("blog_token");
    if (this.token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + this.token;
      this.$store.dispatch("user/getCurrent");
    } else {
      window.location.replace("login");
    }
  },
};
</script>

<style>
.footer {
  height: 80px;
  display: flex;
  justify-content: center;
  font-size: 15px;
  /* width: 100%; */
  margin: auto;
  font-weight: bold;
  letter-spacing: 2px;
  text-align: center;
}
</style>


