<template>
  <div class="modal" :class="isOpen ? 'is-active' : null">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Add Transaction</p>
        <button class="delete" aria-label="close" @click="$emit(toggleModal())"></button>
      </header>
      <section class="modal-card-body">
        <div class="columns">
          <div class="field column is-half">
            <DatePicker :inline="true" v-model="date"/>
          </div>
          <div class="column is-half">
            <div class="field">
              <div class="control">
                <input
                  class="input"
                  placeholder="0.00"
                  max="0"
                  type="number"
                  step=".01"
                  v-model="value">
              </div>
            </div>
            <div class="field" v-if="type === 'expense'">
              <div class="control">
                <div class="select">
                  <select v-model="category" >
                    <option value=null>Select category</option>
                    <option
                      v-for="(category, id) in Object.keys(expensesCategories)"
                      :key="id"
                      :value="category">
                      {{ category }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div class="field" v-if="type === 'expense'">
              <div class="control">
                <div class="select" >
                  <select v-model="subcategory">
                    <option value=null>Select subcategory</option>
                    <option v-for="(subcategory, id) in this.expensesCategories[this.category]"
                            :key="id"
                            :value="subcategory"
                    >{{subcategory}}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div class="field" v-else>
              <div class="control">
                <div class="select">
                  <select v-model="category" >
                    <option value=null>Select category</option>
                    <option
                      v-for="(category, id) in incomesCategories"
                      :key="id"
                      :value="category">
                      {{ category }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div class="field">
              <div class="control">
                <input
                  class="input"
                  type="text"
                  placeholder="Description" v-model="description">
              </div>
            </div>
            <button
              class="button"
              @click="submit()" :disabled='!date || !value || !category'>Add</button>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button" @click="$emit(toggleModal())">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import DatePicker from 'vuejs-datepicker';

export default {
  components: {
    DatePicker,
  },
  props: ['type', 'toggleModal', 'isOpen'],
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
        id: Math.random().toString(36).substr(2, 9),
        type: this.type,
        date: this.date,
        value: this.value,
        category: this.category,
      };
    },
    getExpenseData() {
      return {
        id: Math.random().toString(36).substr(2, 9),
        type: this.type,
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
  .select {
    width: 100%;
  }
  select {
    width: 100%;
  }
</style>
