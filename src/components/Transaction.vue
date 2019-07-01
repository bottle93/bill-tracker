<template>
  <div class="container"
       @click="toggleClass(data.id)"
       :class="expanded ? 'expanded': null">
    <div>
      <span v-if="data.type === 'expense'"> - </span>
      <span>
        {{data.value}}
      </span>
      <div v-if="expanded">
        <span v-if="data.description">{{data.description}} </span>
        <span>
        {{data.date | moment("DD/MM/YYYY")}}
        </span>
        <span>category: {{data.category}}, </span>
        <span v-if="data.subcategory">subcategory: {{data.subcategory}}, </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['data'],
  data() {
    return {
      expanded: null,
    };
  },
  methods: {
    toggleClass() {
      this.expanded
        ? this.expanded = false
        : this.expanded = true;
    },
  },
};
</script>

<style>
  .expanded {
    color: red;
  }
</style>
