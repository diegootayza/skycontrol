<template>
    <div class="gallery">
        <v-card outlined>
            <v-card-title>
                <span>Imágenes</span>
                <v-spacer />
                <input ref="files" accept="image/*" hidden multiple type="file" @change="previewController($event)" />
                <v-btn icon small @click="$refs.files.click()">
                    <v-icon small v-text="'mdi-plus'" />
                </v-btn>
            </v-card-title>
            <v-divider />
            <v-card-text style="max-height: 300px; overflow-y: auto">
                <div class="gallery__items">
                    <GalleryItem
                        v-for="(value, index) in items"
                        :key="index"
                        :item="value"
                        @action="captureAction($event, value)"
                        @click="showController(value)"
                        @update="updateItem($event, index)"
                    />
                </div>
            </v-card-text>
        </v-card>

        <v-dialog v-model="preview" max-width="600" persistent>
            <GalleryPreview :images="images" @add="$refs.files.click()" @close="resetPreview()" @remove="removeFile($event)" />
        </v-dialog>

        <v-dialog v-model="view" persistent>
            <GalleryView :item="item" :method="method" @action="captureAction($event)" @close="resetData()" @controller="viewController($event)" />
        </v-dialog>

        <v-dialog v-model="edit" max-width="460" persistent>
            <v-card>
                <v-card-text class="pt-4 pb-0 px-4">
                    <v-text-field v-model="submitData.name" outlined />
                </v-card-text>
                <v-divider />
                <v-card-actions>
                    <v-switch v-model="submitData.main" label="Imagen principal" />
                    <v-spacer />
                    <v-btn outlined @click="resetEdit()">Cancelar</v-btn>
                    <v-btn outlined>Actualizar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="remove" max-width="400" persistent>
            <v-card>
                <v-card-text class="pa-4">
                    <strong class="d-block text-center">¿Estás seguro que quieres eliminar este elemento?</strong>
                </v-card-text>
                <v-divider />
                <v-card-actions>
                    <v-spacer />
                    <v-btn outlined @click="resetRemove()">Cancelar</v-btn>
                    <v-btn outlined>Eliminar</v-btn>
                    <v-spacer />
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'

    class Model {
        main: boolean
        name: string

        constructor(data?: any) {
            this.main = data ? data.main : false
            this.name = data ? data.name : ''
        }
    }

    export default Vue.extend({
        props: {
            files: {
                default: null,
                type: Object,
            },
        },

        data() {
            return {
                method: 'CREATE',
                preview: false,
                view: false,
                edit: false,
                remove: false,
                item: {} as any,
                items: [] as any[],
                images: [] as any[],
                tempFiles: [] as any[],
                submitData: new Model(),
            }
        },

        watch: {
            files: {
                immediate: true,
                handler(v) {
                    if (v && v.images) {
                        this.items = v.images
                    }
                },
            },

            item: {
                immediate: false,
                handler(v) {
                    this.submitData = new Model({ main: v.main, name: v.name })
                },
            },
        },

        methods: {
            updateItem(src: string, index: number) {
                this.items[index].src = src
            },

            resetData() {
                this.method = 'CREATE'
                this.view = false
                this.item = {}
                this.submitData = new Model()
            },

            resetPreview() {
                this.preview = false
                this.images = []
                this.tempFiles = []
            },

            resetEdit() {
                this.method = 'CREATE'
                this.edit = false
            },

            resetRemove() {
                this.method = 'CREATE'
                this.remove = false
            },

            captureAction(method: string, item: any) {
                this.method = method

                if (method === 'UPDATE' || method === 'DELETE') {
                    if (item) this.item = item
                }

                if (method === 'UPDATE') {
                    this.view = true
                    setTimeout(() => {
                        this.edit = true
                    }, 200)
                }

                if (method === 'DELETE') {
                    this.view = true
                    setTimeout(() => {
                        this.remove = true
                    }, 200)
                }
            },

            previewController(event: any) {
                const files = event.target.files
                const element = this.$refs.files as any

                if (files.length > 0) {
                    this.tempFiles = Array.from(files)

                    files.forEach((file: any) => {
                        this.images.push({ path: URL.createObjectURL(file) })
                    })

                    this.preview = true
                }

                if (element) files.value = null
            },

            showController(item: any) {
                this.view = true
                this.item = item
            },

            viewController(option: string) {
                const index = this.items.findIndex((value) => value.path === this.item.path)

                if (option === 'prev') {
                    if (index > 0) this.item = this.items[index - 1]
                }

                if (option === 'next') {
                    if (index < this.items.length - 1) this.item = this.items[index + 1]
                }
            },

            removeFile(index: number) {
                this.images.splice(index, 1)
                this.tempFiles.splice(index, 1)
            },

            // async submitForm() {
            //     if (method === 'CREATE') {
            //     }

            //     if (method === 'UPDATE') {
            //     }

            //     if (method === 'DELETE') {
            //     }
            // },
        },
    })
</script>

<style lang="scss">
    .gallery {
        &__items {
            display: grid;
            grid-row-gap: 1rem;
            grid-column-gap: 1rem;
            grid-template-columns: repeat(2, calc((100% / 2) - (1rem * 1 / 2)));
        }
    }
</style>
