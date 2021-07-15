<template>
    <client-only>
        <v-main>
            <v-container fluid>
                <v-card>
                    <v-data-table :headers="headers" :items="items" @click:row="selectItem($event)"></v-data-table>
                </v-card>
            </v-container>
            <pre>{{ $data }}</pre>
        </v-main>
    </client-only>
</template>

<script lang="ts">
    import Vue from 'vue'

    import { DataTableHeader } from 'vuetify'

    export default Vue.extend({
        layout: 'dashboard',

        async asyncData({ $axios }) {
            try {
                const response = await $axios.$get(`/tickets`)

                return {
                    items: response.data,
                }
            } catch (error) {}
        },

        data() {
            return {
                headers: [
                    {
                        text: 'Activo',
                        value: 'ticket_code',
                    },
                ] as DataTableHeader[],
                items: [] as any[],
            }
        },

        methods: {
            selectItem(item: any) {
                this.$router.push({ name: 'dashboard-tickets-semantic', params: { semantic: item.ticket_code } })
            },
        },
    })
</script>
