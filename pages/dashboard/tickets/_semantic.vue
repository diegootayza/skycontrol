<template>
    <v-main>
        <v-container fluid> </v-container>
        <pre>{{ $data }}</pre>
    </v-main>
</template>

<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend({
        layout: 'dashboard',

        async asyncData({ $axios, params }) {
            try {
                const response = await $axios.$get(`/tickets/${params.semantic}`)

                return {
                    item: response.data,
                }
            } catch (error) {}
        },

        data() {
            return {
                item: {},
            }
        },
    })
</script>
