<template>
  <div id="app" class="flex flex-row">
    <NavBar></NavBar>
    <router-view />
  </div>
</template>

<script>
import NavBar from "./components/NavBar";

export default {
  name: "App",
  components: { NavBar }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap");

body {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  font-family: "Montserrat", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  width: 100%;
  height: 100%;
  color: white;
}

.main-view {
  background-color: #121212;
  overflow: auto;
  -webkit-user-select: none;

  &::-webkit-scrollbar {
    width: 0.875rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #5a5a5a;
  }
}
</style>
