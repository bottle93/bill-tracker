<template>
  <tr>
    <th>
      {{data.type}}
    </th>
    <td><span v-if="data.type === 'expense'"> - </span>{{data.value}}</td>
    <td>{{data.category}}</td>
    <td>{{data.subcategory}}</td>
    <td>{{data.date | moment("DD/MM/YYYY")}}</td>
  </tr>
</template>

<script>
export default {
  props: ['data'],
};
</script>
