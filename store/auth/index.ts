import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
    currentUser: null,
    token: null,
    refresh: null,
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
    currentUser: (state) => state.currentUser,
    token: (state) => state.token,
    refresh: (state) => state.refresh,
}

export const mutations: MutationTree<RootState> = {
    currentUser: (state, payload) => (state.currentUser = payload),
    token: (state, payload) => (state.token = payload),
    refresh: (state, payload) => (state.refresh = payload),
}

export const actions: ActionTree<RootState, RootState> = {
    async signin({ commit }, submitData) {
        try {
            const data = await this.$axios.$post(`/login`, submitData)

            const currentUser = {
                permissions: data.modules,
            }

            commit('currentUser', currentUser)
            commit('token', data.token)
            commit('refresh', data.refresh_token)

            this.$cookies.set('currentUser', currentUser)
            this.$cookies.set('token', data.token)
            this.$cookies.set('refresh', data.refresh_token)

            this.$router.push({ name: 'dashboard' })
        } catch (error) {
            console.log(error)
        }
    },

    async refresh() {},

    signout({ commit }) {
        commit('currentUser', null)
        commit('token', null)
        commit('refresh', null)
        this.$cookies.removeAll()
        this.$router.push({ name: 'index' })
    },
}
