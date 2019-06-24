<template>
  <nav class="navbar__main">
    <router-link class="navbar__link" to="/#">Summary</router-link>
    <router-link class="navbar__link" to="/about">Transactions</router-link>
    <router-link class="navbar__link" to="">Categories</router-link>
  </nav>
</template>


<style lang="scss">
  .navbar {
    &__main {
      background-color: grey;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
     }
    &__link {
      text-decoration:  none;
      margin: 10px 15px;
      font-weight: bold;
      font-size: 26px;
      color: whitesmoke;
    }
  }

</style>
