<template>
  <div class='container '>
    <div class="columns">
      <div class="column">
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
      <div class="column is-left">
        <span>
          Your balance:
        </span>
        <span class="user-balance--value">
          {{this.userBalance}}
        </span>
      </div>
    </div>
    <DisplayTransactions/>
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

<style lang="scss">
  .user-balance--value {
    font-size: 2rem;
    color: darkgreen;
    font-weight: bold;
  }
  .typeSelection {
    margin-top: 20px;
  }
</style>
