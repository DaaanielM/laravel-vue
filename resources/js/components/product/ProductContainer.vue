<template>
  <div>
    <v-card>
      <v-container>
        <v-card-title>
          Lista de productos
          <v-spacer></v-spacer>
          <v-text-field
            append-icon="mdi-magnify"
            label="Buscar productos"
            single-line
            hide-details
          >
          </v-text-field>
        </v-card-title>
        <v-item-group multiple>
          <v-row>
            <v-col
              v-for="product in listProducts"
              :key="product.id"
              cols="12"
              sm="4"
              md="2"
            >
              <v-card class="mx-auto" max-width="350" max-height="360">
                <v-img width="350px" height="130px" :src="product.img"> </v-img>

                <v-card-subtitle
                  class="pb-0"
                  style="
                    height: 50px;
                    font-size: 15px;
                    overflow: hidden;
                    padding: 5px 15px;
                    color: #006064;
                    font-weight: bold;
                    text-align: center;
                  "
                >
                  {{ product.name }}
                </v-card-subtitle>
                <v-card-text
                  style="color: #000000; font-weight: bold; text-align: center"
                >
                  <div>{{ product.description }}</div>
                </v-card-text>
                <v-card-text
                  style="color: #e91e63; font-weight: bold; text-align: center"
                >
                  <div>${{ product.price }}</div>
                </v-card-text>

                <v-card-actions class="justify-center">
                  <v-btn
                    color="orange"
                    text
                    dark
                    style="display: flex; align-items: center"
                    @click="openModal('update', product)"
                  >
                    Editar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-item-group>
      </v-container>
    </v-card>
    <v-btn
      bottom
      color="green"
      dark
      fab
      fixed
      right
      @click="openModal('insert')"
    >
      <v-icon> mdi-plus</v-icon>
    </v-btn>

    <v-dialog v-model="dialog" width="800px">
      <v-card>
        <v-card-title style="color: #0277bd"> {{ title }} </v-card-title>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="ID Categoría*"
                v-model="product.category_id"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Nombre*"
                v-model="product.name"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Descripción*"
                v-model="product.description"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Precio*"
                v-model="product.price"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea
                label="Imagen*"
                v-model="product.img"
                required
              ></v-textarea>
            </v-col>
          </v-row>
          <div>
            <div
              style="color: red; text-align: center"
              v-for="(errors, id) in errorMessage"
              :key="id"
              v-text="errors"
            ></div>
          </div>
        </v-container>

        <v-card-actions class="justify-center">
          <v-btn
            text
            dark
            color="success"
            v-if="typeAction == 2"
            @click="update()"
          >
            Modificar
          </v-btn>
          <v-btn
            text
            dark
            color="success"
            v-if="typeAction == 1"
            @click="save()"
          >
            Registrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      dialog: false,
      title: "",
      typeAction: 0,
      actionMessage: {
        agg: "Agregar producto",
        mod: "Actualizar producto",
      },
      product: {
        id: 0,
        category_id: 0,
        name: "",
        description: "",
        price: 0,
        img: "",
      },
      errorMessage: [],
      errorProduct: 0,
    };
  },
  computed: {
    ...mapState("product", ["listProducts", "message"]),
  },
  methods: {
    validate() {
      this.errorProduct = 0;
      this.errorMessage = [];
      if (this.typeAction == 1) {
        if (!this.product.category_id) {
          this.errorMessage.push("Digite la categoría del producto");
        }
        if (!this.product.img) {
          this.errorMessage.push("Ingrese url de la imagen");
        }
        if (!this.product.name) {
          this.errorMessage.push("Digite el nombre del producto");
        }
        if (!this.product.description) {
          this.errorMessage.push("Digite la descripción del producto");
        }
        if (!this.product.price) {
          this.errorMessage.push("Digite el precio del producto");
        }
        if (this.errorMessage.length) {
          this.errorProduct = 1;
        }
      } else {
        if (!this.product.category_id) {
          this.errorMessage.push("Digite la categoría del producto");
        }
        if (!this.product.img) {
          this.errorMessage.push("Ingrese url de la imagen");
        }
        if (!this.product.name) {
          this.errorMessage.push("Digite el nombre del producto");
        }
        if (!this.product.description) {
          this.errorMessage.push("Digite la descripción del producto");
        }
        if (!this.product.price) {
          this.errorMessage.push("Digite el precio del producto");
        }
        if (this.errorMessage.length) {
          this.errorProduct = 1;
        }
      }

      return this.errorProduct;
    },
    cleanMessageError() {
      this.errorProduct = 0;
      this.errorMessage = [];
    },
    ...mapActions("product", ["getList"]),
    openModal(action, data) {
      this.dialog = true;
      switch (action) {
        case "insert":
          this.title = "Insertar nuevo producto";
          this.typeAction = 1;
          this.product.id = 0;
          this.product.category_id = 0;
          this.product.name = "";
          this.product.description = "";
          this.product.price = 0;
          this.product.img = "";
          this.cleanMessageError();

          break;
        case "update":
          this.title = `Editar producto: ${data["name"]}`;
          this.typeAction = 2;
          this.product.id = data["id"];
          this.product.category_id = data["category_id"];
          this.product.name = data["name"];
          this.product.description = data["description"];
          this.product.price = data["price"];
          this.product.img = data["img"];
          this.cleanMessageError();

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
        .dispatch("product/saveProduct", this.product)
        .then(() => {
          this.$store.dispatch("product/getList");
          this.dialog = false;
        })
        .catch((e) => {
          console.log(e.response.data.errors);
          if ((e.response.status = 422)) {
            this.errorMessage = e.response.data.errors;
          }
        });
    },
    update() {
      //   if (this.validate()) {
      //     return;
      //   }
      //   this.$store.dispatch("product/updateProduct", this.product);
      if (this.validate()) {
        return;
      }
      this.$store.dispatch("product/updateProduct", this.product).then(() => {
        this.$store.dispatch("product/getList");
        this.dialog = false;
      });
    },
  },
  created() {
    this.getList();
  },
};
</script>

