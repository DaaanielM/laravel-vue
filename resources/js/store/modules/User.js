import axion from 'axios'


const state = {
    message: '',
    listUsers: []
}
const actions = {
    getLogin({
        commit
    }, user) {
        axion.post('http://localhost/fet/public/api/user/login', {
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
        window.location.replace('home');
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
