<template>
    <div v-ripple class="gallery-item" @click="$emit('click')">
        <div class="gallery-item__image">
            <img v-if="src" :alt="item.name" :src="src" />
            <v-progress-circular v-else indeterminate :size="20" :width="2" />
        </div>
        <div class="gallery-item__text">{{ item.name }}</div>
        <v-menu bottom close-on-click left>
            <template #activator="{ on, attrs }">
                <v-btn icon small v-bind="attrs" v-on="on">
                    <v-icon small v-text="'mdi-dots-vertical'" />
                </v-btn>
            </template>
            <v-list dense>
                <v-list-item @click="$emit('action', 'UPDATE')">
                    <v-list-item-title>Editar</v-list-item-title>
                </v-list-item>
                <v-list-item @click="$emit('action', 'DELETE')">
                    <v-list-item-title>Eliminar</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend({
        props: {
            item: {
                default: null,
                type: Object,
            },
        },

        data() {
            return {
                src: null as any,
            }
        },

        async mounted() {
            if (this.item) {
                const blob = await this.$axios.$get(this.item.path, { responseType: 'blob' })
                const url = URL.createObjectURL(blob)
                this.src = url
                this.$emit('update', url)
            }
        },
    })
</script>

<style lang="scss">
    .gallery-item {
        cursor: pointer;
        padding: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border: 1px solid #e0e0e0;
        border-radius: 4px;

        &__image {
            height: 40px;
            width: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid #e0e0e0;

            img {
                height: 100%;
                width: 100%;
                object-fit: cover;
            }
        }

        &__text {
            width: calc(100% - (40px + 28px));
            padding-left: 0.5rem;
            padding-right: 0.5rem;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
        }

        &__actions {
            width: 60px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    }
</style>
