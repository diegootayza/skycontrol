import { Middleware } from '@nuxt/types'

const auth: Middleware = ({ store, redirect }) => {
    const user = store.getters['auth/currentUser']

    if (!user) redirect({ name: 'index' })
}

export default auth
