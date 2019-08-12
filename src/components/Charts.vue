<template>
  <div class="chart__container columns">
    <div class="column">
      <Chart class="chart__chart" :data="expensesVsIncomes" v-if="expensesVsIncomes"/>
    </div>
    <div class="column">
      <Chart class="chart__chart column" :data="cos" v-if="cos"/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import _ from 'lodash';
import Chart from '../charts/BasicChart';

export default {
  components: { Chart },
  computed: {
    ...mapGetters(['incomes', 'expenses']),
    expensesVsIncomes() {
      const getData = (data) => {
        const dataList = data.sort(this.sortFunction);
        const dataGroupedByMonths = _.groupBy(dataList, element => this.$moment(element.date, "YYYYMM"));
        const dataMonths = Object.keys(dataGroupedByMonths).map(element => this.$moment(element).format('MMMM'));
        let dataValues = Object.values(dataGroupedByMonths);
        dataValues = dataValues.map(array => array
          .reduce((prev, cur) => prev + Number(cur.value), 0));
        return {
          months: dataMonths,
          values: dataValues,
        };
      };
      const expenses = getData(this.expenses);
      const incomes = getData(this.incomes);
      const labelsList = expenses.months.concat(incomes.months);
      return {
        labels: labelsList,
        datasets: [
          {
            label: 'Incomes',
            backgroundColor: '#272D2D',
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: '#249EBF',
            // Data to be represented on y-axis
            data: incomes.values,
          },
          {
            label: 'Expenses',
            backgroundColor: '#f87979',
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: '#249EBF',
            // Data to be represented on y-axis
            data: expenses.values,
          },
        ],
      };
    },
    cos() {
      const groupedData = _.groupBy(this.expenses, element => element.category); // categories
      const backgroundColors = ['#41B883', '#E46651', '#00D8FF', '#23CE6B', '#272D2D', '#F6F8FF', '#A846A0', '#D741A7', '#3A1772'];
      let sumValues = Object.values(groupedData); // values
      sumValues = sumValues.map(array => array.reduce((prev, cur) => prev + Number(cur.value), 0));
      // need to create datasets
      return {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: '#249EBF',
            // Data to be represented on y-axis
            data: [40, 20, 30, 50, 90, 10, 20, 40, 50, 70, 90, 100],
          },
          {
            label: 'Data Two',
            backgroundColor: '#f87979',
            pointBackgroundColor: 'red',
            borderWidth: 1,
            pointBorderColor: '#F6F8F',
            // Data to be represented on y-axis
            data: [40, 20, 100, 30, 50, 90, 10, 20, 40, 50, 70, 90],
          },
        ],
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
              },
              gridLines: {
                display: true,
              },
            }],
            xAxes: [{
              gridLines: {
                display: false,
              },
            }],
          },
          legend: {
            display: false,
          },
          responsive: true,
          maintainAspectRatio: false,
        },
      };
    },
  },
  methods: {
    sortFunction(a, b) {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateA > dateB ? 1 : -1;
    },
  },
};
</script>

<style lang="scss">

</style>
