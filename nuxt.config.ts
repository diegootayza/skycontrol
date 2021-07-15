import { NuxtConfig } from '@nuxt/types'
import colors from 'vuetify/lib/util/colors'

const Nuxt: NuxtConfig = {
    head: {
        titleTemplate: '%s - skycontrol',
        meta: [
            {
                charset: 'utf-8',
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
        ],
        link: [
            {
                rel: 'icon',
                type: 'image/x-icon',
                href: '/favicon.ico',
            },
        ],
    },

    css: [],

    plugins: ['~/plugins/axios'],

    components: true,

    buildModules: ['@nuxt/typescript-build', '@nuxtjs/vuetify'],

    vuetify: {
        customVariables: ['~/assets/variables.scss'],
        treeShake: true,
        theme: {
            themes: {
                light: {
                    primary: colors.blue,
                },
                dark: {
                    primary: colors.blue,
                },
            },
        },
    },

    modules: ['cookie-universal-nuxt', '@nuxtjs/axios', 'nuxt-highcharts'],

    axios: {
        baseURL: 'http://temporal56.skydatacr.com/api',
    },

    highcharts: {},

    build: {},
}

export default Nuxt
