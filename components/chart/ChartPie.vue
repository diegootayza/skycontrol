<template>
    <client-only>
        <highchart :options="options" />
    </client-only>
</template>

<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend({
        data() {
            return {
                options: {
                    chart: {
                        type: 'pie',
                        style: {
                            fontFamily: '"Roboto",  sans-serif',
                        },
                    },
                    credits: {
                        enabled: false,
                    },
                    title: {
                        text: 'Browser market shares in January, 2018',
                    },
                    plotOptions: {
                        pie: {
                            dataLabels: {
                                enabled: false,
                            },
                        },
                    },
                    series: [],
                } as any,
            }
        },

        created() {
            this.options.series = [
                {
                    name: 'Brands',
                    data: [
                        {
                            name: 'Chrome',
                            y: 61.41,
                        },
                        {
                            name: 'Internet Explorer',
                            y: 11.84,
                        },
                        {
                            name: 'Firefox',
                            y: 10.85,
                        },
                        {
                            name: 'Edge',
                            y: 4.67,
                        },
                        {
                            name: 'Safari',
                            y: 4.18,
                        },
                        {
                            name: 'Other',
                            y: 7.05,
                        },
                    ],
                },
            ]
        },
    })
</script>
