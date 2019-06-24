import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';

Vue.use(Vuex);

const vuexLocalStorage = new VuexPersist({
  key: 'vuex',
  storage: window.localStorage,
});

export default new Vuex.Store({
  state: {
    expensesCategories: {
      clothes: ['accessories', 'shoes', 'casual', 'sport', 'other'],
      entertainment: ['dates', 'cinema', 'sport', 'games', 'hobby', 'other'],
      food: ['lunch', 'homemadeFood', 'eatingOut', 'alcohol', 'other'],
      health: ['dentist', 'survey', 'healthCare', 'medicines', 'supplements', 'other'],
      house: ['rent', 'bills', 'other'],
      hygiene: ['cosmetics', 'beautician', 'cleaning products', 'other'],
      media: ['tv', 'internet', 'mobiles', 'other'],
      transport: ['taxi', 'tickets', 'car', 'other'],
    },
    incomesCategories: ['payroll', 'money gifts', 'other'],
    incomes: [],
    expenses: [],
    userBalance: null,
  },
  getters: {
    expensesCategories: state => state.expensesCategories,
    incomesCategories: state => state.incomesCategories,
    incomes: state => state.incomes,
    expenses: state => state.expenses,
    userBalance: state => state.userBalance,
  },
  mutations: {
    addExpense(state, expenseData) {
      this.state.expenses.push(expenseData);
    },
    addIncome(state, incomeData) {
      this.state.incomes.push(incomeData);
    },
    calcUserBalance() {
      const incomesSummary = this.state.incomes.reduce((prev, cur) => prev + Number(cur.value), 0);
      const expenseSummary = this.state.expenses.reduce((prev, cur) => prev + Number(cur.value), 0);
      this.state.userBalance = (incomesSummary - expenseSummary);
    },
  },
  actions: {
    addExpense(context, data) {
      context.commit('addExpense', data);
    },
    addIncome(context, data) {
      context.commit('addIncome', data);
    },
    calcUserBalance(context) {
      context.commit('calcUserBalance');
    },
  },
  plugins: [vuexLocalStorage.plugin],
});
