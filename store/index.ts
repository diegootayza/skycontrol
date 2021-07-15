import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {}

export const mutations: MutationTree<RootState> = {}

export const actions: ActionTree<RootState, RootState> = {
    async nuxtServerInit({ commit }, { $cookies }) {
        commit('auth/currentUser', await $cookies.get('currentUser'))
        commit('auth/token', await $cookies.get('token'))
        commit('auth/refresh', await $cookies.get('refresh'))
    },
}
