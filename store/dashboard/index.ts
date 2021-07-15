import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
    title: '',
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
    title: (state) => state.title,
}

export const mutations: MutationTree<RootState> = {
    title: (state, payload) => (state.title = payload),
}

export const actions: ActionTree<RootState, RootState> = {}
