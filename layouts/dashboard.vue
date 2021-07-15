<template>
    <v-app id="default">
        <v-navigation-drawer app>
            <v-list dense nav>
                <template v-for="(a, ia) in routes">
                    <template v-if="a.children">
                        <v-list-group :key="ia" color="primary" no-action :prepend-icon="a.icon">
                            <template #activator>
                                <v-list-item-content>
                                    <v-list-item-title v-text="a.text" />
                                </v-list-item-content>
                            </template>
                            <v-list-item v-for="(b, ib) in a.children" :key="ib" :exact="b.exact" :to="b.route">
                                <v-list-item-content>
                                    <v-list-item-title v-text="b.text" />
                                </v-list-item-content>
                            </v-list-item>
                        </v-list-group>
                    </template>
                    <template v-else>
                        <v-list-item :key="ia" color="primary" :exact="a.exact" :to="a.route">
                            <v-list-item-icon>
                                <v-icon v-text="a.icon" />
                            </v-list-item-icon>
                            <v-list-item-title v-text="a.text" />
                        </v-list-item>
                    </template>
                </template>
            </v-list>

            <template slot="append">
                <div class="pa-4">
                    <v-btn block @click="$store.dispatch('auth/signout')">Cerrar sesión</v-btn>
                </div>
            </template>
        </v-navigation-drawer>

        <v-app-bar app color="white">
            <v-app-bar-nav-icon />
            <v-toolbar-title>{{ title }}</v-toolbar-title>
            <v-spacer />
            <v-btn> Hola </v-btn>
        </v-app-bar>

        <Nuxt />
    </v-app>
</template>

<script lang="ts">
    import Vue from 'vue'
    import { mapGetters } from 'vuex'

    export default Vue.extend({
        middleware: ['auth'],

        data() {
            return {
                routes: [
                    {
                        exact: true,
                        icon: 'mdi-view-dashboard',
                        text: 'Panel de control',
                        route: { name: 'dashboard' },
                    },
                    {
                        icon: 'mdi-table-check',
                        text: 'Activos',
                        children: [
                            {
                                exact: true,
                                text: 'Listado de activos',
                                route: { name: 'dashboard-actives' },
                            },
                            {
                                exact: true,
                                text: 'Grupos de activos',
                                route: { name: 'dashboard-actives-groups' },
                            },
                        ],
                    },
                    {
                        icon: 'mdi-folder-outline',
                        text: 'Encuestas | Inspecciones',
                        children: [
                            {
                                exact: true,
                                text: 'Listado de tiquetes',
                                route: { name: 'dashboard-forms' },
                            },
                        ],
                    },
                    {
                        icon: 'mdi-folder-outline',
                        text: 'Tiquetes',
                        children: [
                            {
                                exact: true,
                                text: 'Listado de tiquetes',
                                route: { name: 'dashboard-tickets' },
                            },
                            {
                                exact: false,
                                text: 'Tablero de tiquetes',
                                route: { name: 'dashboard-tickets-board' },
                            },
                        ],
                    },
                    {
                        icon: 'mdi-folder-outline',
                        text: 'Combustible',
                        children: [
                            {
                                exact: true,
                                text: 'Listado de tiquetes',
                                route: { name: 'dashboard-fuels' },
                            },
                        ],
                    },
                    {
                        icon: 'mdi-folder-outline',
                        text: 'Ordenes de Servicio',
                        children: [
                            {
                                exact: true,
                                text: 'Listado de tiquetes',
                                route: { name: 'dashboard-orders' },
                            },
                        ],
                    },
                    {
                        icon: 'mdi-folder-outline',
                        text: 'Items de Servicio',
                        children: [
                            {
                                exact: true,
                                text: 'Listado de tiquetes',
                                route: { name: 'dashboard-services' },
                            },
                        ],
                    },
                    {
                        icon: 'mdi-folder-outline',
                        text: 'Contactos',
                        children: [
                            {
                                exact: true,
                                text: 'Listado de tiquetes',
                                route: { name: 'dashboard-contacts' },
                            },
                        ],
                    },
                    {
                        icon: 'mdi-folder-outline',
                        text: 'Tareas',
                        children: [
                            {
                                exact: true,
                                text: 'Listado de tiquetes',
                                route: { name: 'dashboard-tasks' },
                            },
                        ],
                    },
                    {
                        icon: 'mdi-folder-outline',
                        text: 'Recordatorios',
                        children: [
                            {
                                exact: true,
                                text: 'Listado de tiquetes',
                                route: { name: 'dashboard-reminders' },
                            },
                        ],
                    },
                    {
                        icon: 'mdi-folder-outline',
                        text: 'Proveedores',
                        children: [
                            {
                                exact: true,
                                text: 'Listado de tiquetes',
                                route: { name: 'dashboard-vendors' },
                            },
                        ],
                    },
                    {
                        icon: 'mdi-folder-outline',
                        text: 'Reportes',
                        children: [
                            {
                                exact: false,
                                text: 'Reporte de formularios',
                                route: { name: 'dashboard-reports-semantic', params: { semantic: 'forms' } },
                            },
                            {
                                exact: false,
                                text: 'Reporte de tiquetes',
                                route: { name: 'dashboard-reports-semantic', params: { semantic: 'tickets' } },
                            },
                            {
                                exact: false,
                                text: 'Reporte de combustible',
                                route: { name: 'dashboard-reports-semantic', params: { semantic: 'fuel' } },
                            },
                            {
                                exact: false,
                                text: 'Reporte de ordenes',
                                route: { name: 'dashboard-reports-semantic', params: { semantic: 'orders' } },
                            },
                            {
                                exact: false,
                                text: 'Reporte de recordatorios',
                                route: { name: 'dashboard-reports-semantic', params: { semantic: 'reminders' } },
                            },
                            {
                                exact: false,
                                text: 'Reporte de servicios',
                                route: { name: 'dashboard-reports-semantic', params: { semantic: 'services' } },
                            },
                        ],
                    },
                    {
                        exact: false,
                        icon: 'mdi-folder-outline',
                        text: 'Geocercas',
                        route: { name: 'dashboard-geofences' },
                    },
                ],
            }
        },

        computed: {
            ...mapGetters({
                title: 'dashboard/title',
            }),
        },

        methods: {},
    })
</script>

<style lang="scss"></style>
