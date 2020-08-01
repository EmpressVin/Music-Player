<template>
  <div id="app" class="flex flex-col">
    <div class="App__main-window">
      <NavBar></NavBar>
      <router-view />
    </div>
    <NowPlayingBar></NowPlayingBar>
  </div>
</template>

<script>
import NavBar from "./components/NavBar";
import NowPlayingBar from "./components/NowPlayingBar";

export default {
  name: "App",
  components: { NavBar, NowPlayingBar }
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

.App__main-window {
  width: 100%;
  height: calc(100% - 5.5rem);
  display: flex;
  flex-direction: row;
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

input[type="range"] {
  -webkit-appearance: none;
  background-color: #404040;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
  }

  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 0.25rem;
    cursor: pointer;
    background-color: #fff;
  }

  &:focus {
    outline: none;
  }
}
</style>
