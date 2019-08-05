<template>
  <div class='container '>
    <DisplayTransactions/>
    <div>user balance: {{this.userBalance}}</div>
    <div class="section">
      <div class='typeSelection' v-if='openModal === false'>
        <button
          class='button'
          @click='toggleExpense'>Add Expense</button>
        <button
          class='button'
          @click='toggleExpense'>Add Income</button>
      </div>
      <AddTransaction :type='type' :toggleModal="toggleModal" :isOpen="openModal"/>
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
      openModal: false,
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
      this.toggleModal();
    },
    toggleModal() {
      this.openModal = !this.openModal;
    },
  },
};

</script>
