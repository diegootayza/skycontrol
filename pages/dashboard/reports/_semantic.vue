<template>
    <v-main>
        <v-container>
            <v-card outlined>
                <v-card-text>
                    <div class="reports-semantic__main">
                        <v-autocomplete
                            v-model="submitData.form_header_code"
                            :items="forms"
                            item-text="form_header_name"
                            item-value="form_header_code"
                            label="Selecciona un formulario"
                            outlined
                        />
                        <v-text-field outlined />
                    </div>
                </v-card-text>
                <v-divider />
                <v-card-actions>
                    <v-btn @click="submitForm('web')">
                        <v-icon left>mdi-monitor</v-icon>
                        Web
                    </v-btn>
                    <v-btn @click="submitForm('xlsx')">
                        <v-icon left>mdi-file-excel</v-icon>
                        Excel
                    </v-btn>
                    <v-btn @click="submitForm('pdf')">
                        <v-icon left>mdi-file-pdf</v-icon>
                        PDF
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-container>
    </v-main>
</template>

<script lang="ts">
    import Vue from 'vue'

    class Submit {
        completed_form_ended_at: string
        completed_form_started_at: string
        form_header_code: string
        form_type: string

        constructor(data?: any) {
            this.completed_form_ended_at = data ? data.completed_form_ended_at : '2020-12-09 23:59:59'
            this.completed_form_started_at = data ? data.completed_form_started_at : '2020-12-09 00:00:00'
            this.form_header_code = data ? data.form_header_code : '8ff345'
            // this.form_type = data ? data.form_type : 'pdf'
            this.form_type = data ? data.form_type : 'xlsx'
        }
    }

    export default Vue.extend({
        layout: 'dashboard',

        async asyncData({ $axios }) {
            try {
                const response = await $axios.$get('/form_headers')

                return {
                    forms: response.data,
                }
            } catch (error) {
                console.log(error)
            }
        },

        data() {
            return {
                submitData: new Submit(),
                forms: [] as any[],
            }
        },

        methods: {
            async submitForm() {
                try {
                    const { headers, data } = await this.$axios.post('/form_reports?lang=es', this.submitData, { responseType: 'blob' })

                    console.log(headers['content-type'])

                    // let extension = ''

                    // if (headers['content-type'] === 'application/zip') extension = 'zip'

                    // const element = document.createElement('a')

                    // element.download = `excel.${extension}`
                    // element.href = URL.createObjectURL(new Blob([data]))

                    // document.body.appendChild(element)
                    // element.click()
                    // document.body.removeChild(element)
                } catch (error) {
                    console.log(error)
                }
            },
        },
    })
</script>

<style lang="scss">
    .reports-semantic {
        &__main {
            display: grid;
            grid-column-gap: 1rem;
            grid-template-columns: repeat(2, 1fr);
        }
    }
</style>
