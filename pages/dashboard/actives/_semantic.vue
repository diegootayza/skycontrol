<template>
    <v-main>
        <v-container fluid>
            <v-card class="mb-2" outlined>
                <v-card-title>
                    <v-spacer />
                    <div class="actives-semantic__buttons">
                        <v-btn text :to="{ name: 'dashboard-actives-semantic', params: { semantic: semantic } }">General</v-btn>
                        <v-btn text>Tiquetes</v-btn>
                        <v-btn text>Recordatorios</v-btn>
                        <v-btn text>Combustible</v-btn>
                    </div>
                </v-card-title>
            </v-card>
            <v-row dense>
                <v-col cols="12" lg="4" md="6" xl="4">
                    <v-card class="mb-2" outlined>
                        <v-card-title>
                            <span>Informacion</span>
                            <v-spacer />
                            <v-btn icon small>
                                <v-icon small v-text="'mdi-pencil'" />
                            </v-btn>
                        </v-card-title>
                        <v-divider />
                        <v-card-text>
                            <v-simple-table dense>
                                <tbody>
                                    <tr>
                                        <td>Identificador</td>
                                        <td class="primary--text">span</td>
                                    </tr>
                                </tbody>
                            </v-simple-table>
                        </v-card-text>
                    </v-card>
                    <v-card outlined>
                        <v-card-title>
                            <span>Características</span>
                        </v-card-title>
                        <v-divider />
                        <v-card-text></v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="12" lg="4" md="6" xl="4">
                    <v-card class="mb-2" outlined>
                        <v-card-title>
                            <v-tabs grow height="32">
                                <v-tab>sdsda</v-tab>
                                <v-tab>sdsda</v-tab>
                                <v-tab>sdsda</v-tab>
                                <v-tab>sdsda</v-tab>
                            </v-tabs>
                        </v-card-title>
                        <v-divider />
                        <v-card-text></v-card-text>
                    </v-card>
                    <v-card outlined>
                        <v-card-title>
                            <span>Informacion</span>
                        </v-card-title>
                        <v-divider />
                        <v-card-text></v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="12" lg="4" md="6" xl="4">
                    <v-card class="mb-2" outlined>
                        <v-card-title>
                            <span>Informacion</span>
                        </v-card-title>
                        <v-divider />
                        <v-card-text></v-card-text>
                    </v-card>
                    <Gallery class="mb-2" :files="item.vehicle_files" />
                    <v-card outlined>
                        <v-card-title>
                            <span>Informacion</span>
                        </v-card-title>
                        <v-divider />
                        <v-card-text></v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>

        <pre>{{ $data }}</pre>
    </v-main>
</template>

<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend({
        layout: 'dashboard',

        async asyncData({ $axios, params }) {
            try {
                const response = await $axios.$get(`/vehicles/${params.semantic}`)

                return {
                    semantic: params.semantic,
                    item: response.data,
                }
            } catch (error) {}
        },

        data() {
            return {
                semantic: '',
                item: {},
            }
        },
    })
</script>

<style lang="scss">
    .actives-semantic {
        // &__main {
        //     display: grid;
        //     grid-row-gap: 1rem;
        //     grid-column-gap: 1rem;
        //     grid-template-columns: repeat(3, calc((100% / 3) - (1rem * 2 / 3)));
        // }

        &__buttons {
        }
    }
</style>
