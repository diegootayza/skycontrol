<template>
    <client-only placeholder="Loading...">
        <v-main>
            <v-container class="pa-4" fluid>
                <v-row dense>
                    <v-col>
                        <v-card outlined>
                            <v-card-title>
                                <ResourceSearch />
                                <v-spacer />
                                <div>
                                    <v-btn text>
                                        <v-icon left small v-text="'mdi-filter'" />
                                        <span>Filtrar</span>
                                    </v-btn>
                                </div>
                            </v-card-title>
                            <v-divider />
                            <v-data-table
                                disable-sort
                                :headers="headers"
                                hide-default-footer
                                hide-default-header
                                :items="items"
                                :items-per-page="pagination.count"
                                @click:row="selectItem($event)"
                            ></v-data-table>
                            <v-divider />
                            <v-card-actions>
                                <v-pagination v-model="pagination.current" :length="pagination.total" total-visible="5" />
                            </v-card-actions>
                        </v-card>
                    </v-col>
                    <v-col>
                        <v-card outlined>
                            <v-card-title>
                                <v-btn icon>
                                    <v-icon small v-text="'mdi-chevron-left'" />
                                </v-btn>
                                <v-spacer />
                                <v-btn text>
                                    <v-icon left small v-text="'mdi-filter'" />
                                    <span>Filtrar</span>
                                </v-btn>
                            </v-card-title>
                            <v-divider />
                            <v-card-text></v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
            <pre>{{ pagination }}</pre>
            <!-- <pre>{{ $data }}</pre> -->
        </v-main>
    </client-only>
</template>

<script lang="ts">
    import Vue from 'vue'

    import { DataTableHeader } from 'vuetify'

    import pagination from '@/controllers/pagination'

    export default Vue.extend({
        layout: 'dashboard',

        async asyncData({ $axios }) {
            try {
                const response = await $axios.$get(`/vehicles?page=1&per_page=10`)

                return {
                    items: response.data,
                    pagination: pagination(response.meta.pagination),
                }
            } catch (error) {}
        },

        data() {
            return {
                headers: [
                    {
                        text: 'Activo',
                        value: 'vehicle_code',
                    },
                ] as DataTableHeader[],
                items: [] as any[],
                pagination: {} as any,
            }
        },

        created() {
            this.$store.commit('dashboard/title', 'Listado de activos')
        },

        methods: {
            selectItem(item: any) {
                this.$router.push({ name: 'dashboard-actives-semantic', params: { semantic: item.vehicle_id } })
            },
        },
    })
</script>
