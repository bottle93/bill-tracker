<template>
  <div>
    <div>user balance: {{this.userBalance}} </div>
    <div class="typeSelection">
      <button :disabled="this.addExpense" @click="toggleExpense">Expense</button>
      <button :disabled="this.addIncome" @click="toggleExpense">Income</button>
    </div>
    <AddTransaction :type="type"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import AddTransaction from './AddTransaction.vue';

export default {
  components: { AddTransaction },
  data() {
    return {
      type: 'income',
      addExpense: false,
      addIncome: true,
    };
  },
  computed: {
    ...mapGetters(['incomes', 'userBalance']),
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
