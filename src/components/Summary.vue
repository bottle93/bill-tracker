<template>
  <div class='container'>
    <div class='title is-centered'>user balance: {{this.userBalance}}</div>
    <DisplayTransactions/>
    <button
      class='button'
      @click='addTransaction = !addTransaction'
      v-if='addTransaction === false'>Add new</button>
    <div class='typeSelection' v-else>
      <button
        class='button'
        :disabled='this.addExpense' @click='toggleExpense'>Expense</button>
      <button
        class='button'
        :disabled='this.addIncome' @click='toggleExpense'>Income</button>
      <button
        class='button'
        @click='addTransaction = !addTransaction'>Cancel</button>
      <AddTransaction :type='type'/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import DisplayTransactions from './DisplayTransactions.vue';
import AddTransaction from './AddTransaction.vue';

export default {
  components: { AddTransaction, DisplayTransactions },
  data() {
    return {
      addTransaction: false,
      type: 'income',
      addExpense: false,
      addIncome: true,

    };
  },
  computed: {
    ...mapGetters(['incomes', 'userBalance', 'expenses']),
  },
  methods: {
    toggleExpense() {
      this.addIncome = !this.addIncome;
      this.addExpense = !this.addExpense;
      this.addExpense ? this.type = 'expense' : this.type = 'income';
    },
  },
};

</script>
