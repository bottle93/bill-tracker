<template>
  <div  class="container">
    <div class="filters columns is-multiline is-centered" >
      <button
        class="button column is-one-quarter"
        @click="() => this.filter = null">All</button>
      <button
        class="button column is-one-quarter"
        @click="() => this.filter = 'income'">Incomes</button>
      <button
        class="button column is-one-quarter"
        @click="() => this.filter = 'expense'">Expenses</button>
      <div
        class="button column is-one-quarter"
        @click="() => this.filter = 'date'">Date from</div>
      <div v-if="this.filter === 'date'">
        <DatePicker v-model="dateFrom"/>
      </div>
    </div>
      <FullTransaction
        v-for="obj in filteredTransactions" :data="obj"
        :key="obj.id"
      />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import DatePicker from 'vuejs-datepicker';
import FullTransaction from './FullTransaction.vue';

export default {
  components: { FullTransaction, DatePicker },
  data() {
    return {
      dateFrom: null,
      filter: null,
      filterByDate: false,
      filterByType: false,
      filterByCategory: false,
    };
  },
  computed: {
    ...mapGetters(['incomes', 'expenses']),
    filteredTransactions() {
      let transactions;
      if (this.filter === 'income') {
        transactions = this.incomes;
      } else if (this.filter === 'expense') {
        transactions = this.expenses;
      } else if (this.date && this.dateFrom) {
        transactions = this.incomes.concat(this.expenses);
        transactions.filter((item) => {
          const itemTime = new Date(item.date).getTime();
          return itemTime >= new Date(this.dateFrom).getTime();
        });
      } else {
        transactions = this.incomes.concat(this.expenses);
      }
      console.log(transactions)
      return transactions.sort(this.sortFunction);
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
