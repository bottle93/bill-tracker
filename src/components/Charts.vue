<template>
  <div class="chart__container">
    <Chart class="chart__chart" :data="chartData" v-if="chartData"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import _ from 'lodash';
import Chart from '../charts/BasicChart';

export default {
  components: { Chart },
  data() {
    return {
      chartData: null,
    };
  },
  mounted() {
    this.fillData();
  },
  computed: {
    ...mapGetters(['incomes', 'expenses']),

  },
  methods: {
    fillData() {
      const groupedData = _.groupBy(this.expenses, element => element.category);
      const backgroundColors = ['#41B883', '#E46651', '#00D8FF', '#23CE6B', '#272D2D', '#F6F8FF', '#A846A0', '#D741A7', '#3A1772'];
      let sumValues = Object.values(groupedData);
      sumValues = sumValues.map(array => array.reduce((prev, cur) => prev + Number(cur.value), 0));
      this.chartData = {
        labels: Object.keys(groupedData),
        datasets: [
          {
            backgroundColor: backgroundColors,
            data: sumValues,
          },
        ],
      };
    },

  },
};
</script>

<style lang="scss">

</style>
