import {signInUser, signUpUser} from "@/api/user";

const user = {
    namespaced: true,
    state: {
        token: "",
    },
    mutations: {
        getToken: (state, {accessToken}) => {
            state.token = accessToken
            localStorage.setItem('user_token', state.token)
        }
    },
    actions: {
        setAccessAuth({commit}, {obj, status}) {
            return new Promise((resolve, reject) => {
                if (status === 'login') {
                    signInUser(obj).then(response => {
                        if (!response.data) {
                            reject('error')
                        }
                        const data = response.data
                        commit('getToken', data.token)
                        resolve(response)
                    }).catch(error => {
                        reject(error)
                    })
                } else {
                    signUpUser(obj).then(response => {
                        if (!response.data) {
                            reject('error')
                        }
                        resolve(response)
                    }).catch(error => {
                        reject(error)
                    })
                }

            })
        },

    }
}

export default user
