<template>
    <v-main>
        <v-container fluid> </v-container>
    </v-main>
</template>

<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend({
        layout: 'dashboard',

        created() {
            this.$store.commit('dashboard/title', 'Grupos de activos')
        },
    })
</script>
