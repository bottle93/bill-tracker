<template>
  <div class="container">
    <DatePicker v-model="date"/>
    <input
      placeholder="0.00"
      max="0"
      type="number"
      step=".01"
      v-model="value">
    <select v-model="category" v-if="type === 'expense'">
      <option
        v-for="(category, id) in Object.keys(expensesCategories)"
        :key="id"
        :value="category">
        {{ category }}
      </option>
    </select>
    <select v-if="type === 'expense'" v-model="subcategory">
      <option v-for="(subcategory, id) in this.expensesCategories[this.category]"
              :key="id"
              :value="subcategory"
      >{{subcategory}}
      </option>
    </select>
    <select  v-model="category" v-else>
      <option
        v-for="(category, id) in incomesCategories"
        :key="id"
        :value="category">
        {{ category }}
      </option>
    </select>
    <button @click="submit()" :disabled='!date || !value || !category'>Add income</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import DatePicker from 'vuejs-datepicker';

export default {
  components: {
    DatePicker,
  },
  props: ['type'],
  data() {
    return {
      date: null,
      value: null,
      category: null,
      subcategory: null,
      description: null,
    };
  },
  created() {
    this.calcUserBalance();
  },
  computed: {
    ...mapGetters(['expensesCategories', 'incomesCategories']),
  },
  methods: {
    ...mapActions(['addIncome', 'addExpense', 'calcUserBalance']),
    clearData() {
      this.date = null;
      this.value = null;
      this.category = null;
      this.description = null;
      this.subcategory = null;
    },
    getIncomeData() {
      return {
        date: this.date,
        value: this.value,
        category: this.category,
      };
    },
    getExpenseData() {
      return {
        date: this.date,
        value: this.value,
        category: this.category,
        description: this.description,
        subcategory: this.subcategory,
      };
    },
    submit() {
      if (this.type === 'income') {
        const data = this.getIncomeData();
        this.addIncome(data);
        this.calcUserBalance();
        this.clearData();
      } else {
        const data = this.getExpenseData();
        this.addExpense(data);
        this.calcUserBalance();
        this.clearData();
      }
    },
  },
};
</script>

<style>
  .container {
    display: flex;
    flex-direction: column;
  }
</style>
