<template>
    <div class="gallery-view">
        <div class="gallery-view__image">
            <img v-if="src" :alt="item.name" :src="src" :style="{ transform: `scale(${zoom})` }" />
            <v-progress-circular v-else color="white" indeterminate />
        </div>
        <div class="gallery-view__controls">
            <v-btn dark icon @click="zoomController('plus')">
                <v-icon v-text="'mdi-magnify-plus'" />
            </v-btn>
            <v-btn dark icon @click="zoomController('minus')">
                <v-icon v-text="'mdi-magnify-minus'" />
            </v-btn>
            <v-btn dark icon @click="$emit('action', 'UPDATE')">
                <v-icon v-text="'mdi-pencil'" />
            </v-btn>
            <v-btn dark icon @click="$emit('action', 'DELETE')">
                <v-icon v-text="'mdi-delete'" />
            </v-btn>
            <v-btn dark icon @click="$emit('close')">
                <v-icon v-text="'mdi-close'" />
            </v-btn>
        </div>

        <v-btn class="gallery-view__button is-left" dark icon @click="$emit('controller', 'prev')">
            <v-icon v-text="'mdi-chevron-left'" />
        </v-btn>
        <v-btn class="gallery-view__button is-right" dark icon @click="$emit('controller', 'next')">
            <v-icon v-text="'mdi-chevron-right'" />
        </v-btn>

        <div class="gallery-view__caption">{{ item.name }}</div>
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

            method: {
                default: 'CREATE',
                type: String,
            },
        },

        data() {
            return {
                interval: null as any,
                src: null as any,
                zoom: 1.0 as number,
            }
        },

        watch: {
            item: {
                immediate: true,
                handler() {
                    this.observer()
                },
            },
        },

        methods: {
            observer() {
                this.interval = setInterval(() => {
                    const { src } = this.item

                    if (src) {
                        this.src = src
                        clearInterval(this.interval)
                    }
                }, 100)
            },

            zoomController(option: string) {
                if (option === 'plus') {
                    switch (this.zoom) {
                        case 1.0:
                            this.zoom = 1.2
                            break
                        case 1.2:
                            this.zoom = 1.4
                            break
                        case 1.4:
                            this.zoom = 1.6
                            break
                    }
                }

                if (option === 'minus') {
                    switch (this.zoom) {
                        case 1.6:
                            this.zoom = 1.4
                            break
                        case 1.4:
                            this.zoom = 1.2
                            break
                        case 1.2:
                            this.zoom = 1.0
                            break
                    }
                }
            },
        },
    })
</script>

<style lang="scss">
    .gallery-view {
        position: relative;
        height: 90vh;
        width: 100%;
        overflow: hidden;
        background-color: rgba(#000000, 0.6);

        &__image {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            height: 100%;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;

            img {
                max-height: 80%;
                max-width: 80%;
            }
        }

        &__controls {
            position: absolute;
            top: 1rem;
            right: 1rem;
            width: 220px;
            padding: 0.5rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-radius: 4px;
            background-color: rgba(#000000, 0.2);
        }

        &__button {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);

            &.is-left {
                left: 1rem;
            }

            &.is-right {
                right: 1rem;
            }
        }

        &__caption {
            position: absolute;
            left: 50%;
            bottom: 1rem;
            transform: translateX(-50%);
            color: #ffffff;
        }
    }
</style>
