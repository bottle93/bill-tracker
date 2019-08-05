<template>
  <tr>
    <td>{{data.date | moment("DD/MM/YYYY")}}</td>
    <td>{{data.category}}</td>
    <td>{{data.subcategory}}</td>
    <th :class="data.type === 'expense' ? 'cell--expense' : 'cell--income'">
      <span v-if="data.type === 'expense'"> - </span>
      {{data.value}}
    </th>
  </tr>
</template>

<script>
export default {
  props: ['data'],
};
</script>

<style lang="scss">
  th.cell {
    &--income  {
      color: darkgreen !important;
    }
    &--expense {
      color: darkred !important;
    }
  }
</style>
