<template>
    <v-main>
        <v-container>
            <v-row no-gutters>
                <v-col> </v-col>
                <v-col sm="4">
                    <v-form @submit.prevent="submitForm()">
                        <v-text-field v-model="submitData.company" dense label="Cuenta" outlined />
                        <v-text-field v-model="submitData.username" dense label="Usuario" outlined />
                        <v-text-field v-model="submitData.password" dense label="Contraseña" outlined type="password" />
                        <v-btn block type="submit">Iniciar sesión ahora</v-btn>
                    </v-form>
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</template>

<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend({
        data() {
            return {
                submitData: {
                    company: '2',
                    username: 'jsolano',
                    password: 'abc..123',
                },
            }
        },

        methods: {
            submitForm() {
                this.$store.dispatch('auth/signin', this.submitData)
            },
        },
    })
</script>
