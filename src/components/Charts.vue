<template>
  <div>
    <Chart :data="chartData" v-if="chartData"/>
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
      console.log(groupedData);
      const data = Object.values(groupedData);
      console.log(data);
      this.chartData = {
        labels: Object.keys(groupedData),
        datasets: [
          {
            backgroundColor: ['#41B883', '#E46651', '#00D8FF'],
            data: [1, 10, 5],
          },
        ],
      };
    },

  },
};
</script>
