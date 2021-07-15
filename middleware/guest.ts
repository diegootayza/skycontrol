import { Middleware } from '@nuxt/types'

const guest: Middleware = ({ store, redirect }) => {
    const user = store.getters['auth/currentUser']

    if (user) redirect({ name: 'dashboard' })
}

export default guest
