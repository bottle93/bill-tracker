<template>
  <div  class="">
    <table class="table container is-fullwidth">
      <thead>
      <th>date</th>
      <th>category</th>
      <th>subcategory</th>
      <th>value</th>
      </thead>
      <tbody>
      <Transaction
        v-for="obj in filteredTransactions" :data="obj"
        :key="obj.id"
      />
      </tbody>
    </table>
    <div class="is-pulled-left panel no-border">
      <div class="panel-tabs no-border">
        <a
          class="control no-border"
          :class="filter === null ? 'active' : null"
          @click="filter = null">All</a>
        <a
          class="control no-border"
          :class="filter === 'income' ? 'active' : null"
          @click="filter = 'income'">Incomes</a>
        <a
          class="control no-border"
          :class="filter === 'expense' ? 'active' : null"
          @click="filter = 'expense'">Expenses</a>
        <a
          class="control no-border"
          :class="filter === 'date' ? 'active' : null"
          @click="filter = 'date'">Date</a>
        <a class="control no-border" v-if="filter === 'date'" >
          <DatePicker placeholder="Date from" v-model="dateFrom"/>
        </a>
      </div>
    </div>
    <Pagination
      class="is-right"
      :total="pagination.total"
      :current="pagination.current"
      :onPageChange="onPageChange"/>
  </div>
</template>

<script>

import { mapGetters } from 'vuex';
import DatePicker from 'vuejs-datepicker';
import Transaction from './Transaction.vue';
import Pagination from './Pagination.vue';


export default {
  components: { Transaction, DatePicker, Pagination },
  data() {
    return {
      dateFrom: null,
      filter: null,
      filterByDate: false,
      filterByType: false,
      filterByCategory: false,
      pagination: {
        current: 1,
        total: null,
        itemPerPage: 6,
      },
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
      } else if (this.dateFrom !== null && this.filter === 'date') {
        transactions = this.incomes.concat(this.expenses);
        transactions = transactions.filter((item) => {
          const itemTime = new Date(item.date).getTime();
          return itemTime >= new Date(this.dateFrom).getTime();
        });
      } else {
        transactions = this.incomes.concat(this.expenses);
      }
      this.pagination.total = Math.ceil(transactions.length / this.pagination.itemPerPage);
      const sorted = transactions.sort(this.sortFunction);
      const paginated = this.paginate(sorted, this.pagination.itemPerPage, this.pagination.current);
      return paginated;
    },
  },
  methods: {
    sortFunction(a, b) {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateA > dateB ? 1 : -1;
    },
    paginate(array, pageSize, pageNumber) {
      // eslint-disable-next-line
      --pageNumber; // because pages logically start with 1, but technically with 0
      return array.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize);
    },
    onPageChange(page) {
      if (page > 0 && page <= this.pagination.total) {
        this.pagination.current = page;
      }
    },
  },
};

</script>

<style lang="scss">
  .active {
    font-weight: bold;
  }
  .no-border {
    border: none !important;
  }
</style>
