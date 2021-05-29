import axios from "axios";
const state = {
    message: "",
    listProducts: [],
    errorMessage: []
};
const actions = {
    async getList({ commit }) {
        const response = await axios.get(
            "http://localhost/fet/public/api/product/products"
        );
        console.log(response);
        commit("SET_PRODUCTS", response.data.products);
    },
    async saveProduct({ commit }, product) {
        const response = await axios.post(
            "http://localhost/fet/public/api/product/products/store",
            {
                id: product.id,
                category_id: product.category_id,
                img: product.img,
                name: product.name,
                description: product.description,
                price: product.price
            }
        );
        console.log(response);
    },
    async updateProduct({ commit }, product) {
        const response = await axios.put(
            "http://localhost/fet/public/api/product/products/update",
            {
                id: product.id,
                category_id: product.category_id,
                img: product.img,
                name: product.name,
                description: product.description,
                price: product.price
            }
        );
        console.log(response);
    }
};
const mutations = {
    SET_PRODUCTS(state, data) {
        state.listProducts = data;
    },
    SetMessage(state, data) {
        state.listProducts = data;
    }
};

export default {
    state,
    actions,
    mutations,
    namespaced: true
};
