<template>
  <div class="container">
    <div v-if="data.type === 'income'">
      {{ data.value}}
    </div>
    <div v-else>
      -{{data.value}}
    </div>
  </div>
</template>

<script>
export default {
  props: ['data'],
};
</script>
