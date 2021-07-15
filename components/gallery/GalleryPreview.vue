<template>
    <v-card>
        <v-card-title>
            <span>Agregar imágenes</span>
            <v-spacer />
            <v-btn icon @click="$emit('close')">
                <v-icon v-text="'mdi-close'" />
            </v-btn>
        </v-card-title>
        <v-divider />
        <v-card-text class="pa-4" style="max-height: 400px; overflow-y: auto">
            <div class="gallery-preview__items">
                <div v-for="(value, index) in images" :key="index" class="gallery-preview__item">
                    <v-btn class="gallery-preview__button" icon small @click="$emit('remove', index)">
                        <v-icon v-text="'mdi-close'" />
                    </v-btn>
                    <img alt="preview" :src="value.path" />
                </div>
                <div v-ripple class="gallery-preview__item is-add" @click="$emit('add')">
                    <v-icon class="mb-4" large v-text="'mdi-plus'" />
                    <span>Buscar más imágenes</span>
                </div>
            </div>
        </v-card-text>
        <v-divider />
        <v-card-actions>
            <v-spacer />
            <v-btn outlined @click="$emit('close')">Cancelar</v-btn>
            <v-btn outlined>Guardar</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend({
        props: {
            images: {
                default: () => [],
                type: Array,
            },
        },
    })
</script>

<style lang="scss">
    .gallery-preview {
        &__items {
            display: grid;
            grid-row-gap: 1rem;
            grid-column-gap: 1rem;
            grid-template-columns: repeat(3, calc((100% / 3) - (1rem * 2 / 3)));
        }

        &__item {
            position: relative;
            height: 200px;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 4px;
            overflow: hidden;
            background-color: rgba(#000000, 0.1);

            &.is-add {
                cursor: pointer;
                flex-direction: column;

                span {
                    text-align: center;
                }
            }

            img {
                height: 100%;
                width: 100%;
                object-fit: cover;
            }
        }

        &__button {
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
        }
    }
</style>
