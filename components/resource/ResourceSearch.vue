<template>
    <div class="resource-search">
        <v-text-field class="mr-2" dense hide-details label="Buscar..." outlined />

        <v-menu max-width="60" offset-x>
            <template #activator="{ on, attrs }">
                <v-btn color="primary" text v-bind="attrs" v-on="on">Mostrar: {{ option.text }}</v-btn>
            </template>
            <v-list dense nav>
                <v-list-item-group v-model="option.index" color="primary">
                    <v-list-item v-for="(a, ia) in options" :key="ia" color="primary" @click="optionController(a, ia)">
                        <v-list-item-title class="text-center" v-text="a.text" />
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-menu>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend({
        data() {
            return {
                option: {
                    index: 0,
                    text: '10',
                    value: 10,
                } as any,
                options: [
                    {
                        text: '10',
                        value: 10,
                    },
                    {
                        text: '20',
                        value: 20,
                    },
                    {
                        text: '30',
                        value: 30,
                    },
                ] as any[],
            }
        },

        methods: {
            optionController(option: any, index: number) {
                this.option = { ...option, index }
            },
        },
    })
</script>

<style lang="scss">
    .resource-search {
        display: flex;
        align-items: center;
    }
</style>
