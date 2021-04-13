import axion from 'axios'


const state = {
    message: '',
    listUsers: []
}
const actions = {
    getLogin({
        commit
    }, user) {
        axios.post('http://localhost/fet/public/api/user/login', {
                email: user.email,
                password: user.password
            })
            .then(response => {
                console.log(response)
                if (response.data.user) {
                    localStorage.setItem('blog_token', response.data.access_token)
                    window.location.replace('home')
                }
                if (response.data.message) {
                    commit('SetMessage', response.data.message)
                }
            })
    },
    getLogout() {
        localStorage.removeItem('blog_token')
        window.location.replace('login');
    },
    getList({
        commit
    }) {
        axios.get('http://localhost/fet/public/api/user/users')
            .then(response => {
                commit('SetUsers', response.data.users)

            })
    },
    getCurrent({
        commit
    }) {
        axion.get('http://localhost/fet/public/api/user/current')
            .then(response => {
                console.log(response)
            })
    },
    async saveUser({commit}, user){
        const response = await axios.post('http://localhost/fet/public/api/user/users/store', {
            name: user.name,
            email: user.email,
            password: user.password
        })
        console.log(response);
    }
}



const mutations = {
    SetMessage(state, data) {
        state.message = data
    },
    SetUsers(state, data) {
        state.listUsers = data
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}
