import { Plugin } from '@nuxt/types'

const axios: Plugin = ({ $axios, store }) => {
    $axios.onRequest((config) => {
        const token = store.getters['auth/token']

        config.headers.Authorization = `Bearer ${token}`
    })

    $axios.onError((error) => {
        const { response } = error

        if (response) {
            if (response.status === 401) store.dispatch('auth/signout')
        }
    })
}

export default axios
