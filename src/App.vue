<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Kapacita</router-link> |
      <router-link to="/orders">Objednávky</router-link>
    </div>
    <img alt="TCB logo" src="./assets/tcblogo.png" class="logoPic"/>

    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #ff6629;
    }
  }
}
.logoPic {
  margin-top: -1rem;
  width: 80%;
  max-width: 700px;
  margin-bottom: 2rem;
}
</style>
