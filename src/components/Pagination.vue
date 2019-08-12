<template>
  <nav class="pagination is-centered" role="navigation" aria-label="pagination">
    <!--<a
      class="pagination-previous"
      @click="$emit(onPageChange(current-1))"
    >
      Previous
    </a>-->
    <!--<a
      class="pagination-next"
      @click="$emit(onPageChange(current+1))">
      Next page
    </a>-->
    <ul class="pagination-list">
      <li v-for="i in total" :key="i">
        <a
          class="pagination-link"
          :class="current === i ? 'is-current' : null"
          @click="$emit(onPageChange(i))"
        >{{i}}</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ['total', 'current', 'onPageChange'],
};
</script>
