<template>
  <div class="now-playing-bar__extra-control">
    <div class="extra-control__volume-control">
      <button
        class="icon"
        v-show="!isMuted && volumeLevel >= 0.5"
        @click="toggleSound"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 7H1V13H5L10 18V2L5 7ZM16.36 16.36L14.95 14.95C15.6025 14.3013 16.1203 13.5301 16.4736 12.6805C16.8269 11.831 17.0088 10.9201 17.0088 10C17.0088 9.07994 16.8269 8.16896 16.4736 7.31946C16.1203 6.46995 15.6025 5.69868 14.95 5.05L16.36 3.64C17.1981 4.47357 17.8632 5.46457 18.3171 6.55605C18.7709 7.64752 19.0046 8.81793 19.0046 10C19.0046 11.1821 18.7709 12.3525 18.3171 13.444C17.8632 14.5354 17.1981 15.5264 16.36 16.36V16.36ZM13.54 13.54L12.12 12.12C12.6818 11.5575 12.9974 10.795 12.9974 10C12.9974 9.205 12.6818 8.4425 12.12 7.88L13.54 6.46C14.008 6.9231 14.3796 7.47442 14.6332 8.08205C14.8867 8.68969 15.0173 9.34158 15.0173 10C15.0173 10.6584 14.8867 11.3103 14.6332 11.9179C14.3796 12.5256 14.008 13.0769 13.54 13.54V13.54Z"
          />
        </svg>
      </button>
      <button
        class="icon"
        v-show="!isMuted && volumeLevel < 0.5 && volumeLevel !== 0"
        @click="toggleSound"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 7H3V13H7L12 18V2L7 7ZM15.54 13.54L14.12 12.12C14.6818 11.5575 14.9974 10.795 14.9974 10C14.9974 9.205 14.6818 8.4425 14.12 7.88L15.54 6.46C16.008 6.9231 16.3796 7.47442 16.6332 8.08205C16.8867 8.68969 17.0173 9.34158 17.0173 10C17.0173 10.6584 16.8867 11.3103 16.6332 11.9179C16.3796 12.5256 16.008 13.0769 15.54 13.54V13.54Z"
          />
        </svg>
      </button>
      <button
        class="icon"
        v-show="!isMuted && volumeLevel == 0"
        @click="toggleSound"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9 7H5V13H9L14 18V2L9 7Z" />
        </svg>
      </button>
      <button class="icon" v-show="isMuted" @click="toggleSound">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 8.59L12.88 6.46L11.46 7.88L13.6 10L11.47 12.12L12.89 13.54L15 11.4L17.12 13.53L18.54 12.11L16.4 10L18.53 7.88L17.11 6.46L15 8.6V8.59ZM4 7H0V13H4L9 18V2L4 7Z"
          />
        </svg>
      </button>
      <div
        class="volume-control_slider"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
      >
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          ref="slider"
          v-model.number="volumeLevel"
          @input="handleInput"
        />
      </div>
    </div>
  </div>
</template>

<script>
// Import Vuex store related items
import { mapActions } from "vuex";

let hover = false;

export default {
  name: "VolumeBar",
  data() {
    return {
      isMuted: false,
      volumeLevel: 1
    };
  },
  mounted() {
    this.updateBarProgress();
  },
  methods: {
    ...mapActions({
      changeVolumeLevel: "Player/changeVolumeLevel"
    }),
    toggleSound() {
      this.isMuted = !this.isMuted;
      window.Event.$emit("toggle-sound", this.isMuted);
    },
    updateBarProgress() {
      const color = hover === false ? "#b3b3b3" : "#1db954";
      const percent = (this.volumeLevel / 1) * 100;

      const gradient = `linear-gradient(90deg, ${color} ${percent}%, #404040 ${percent}%)`;
      this.$refs.slider.style.background = gradient;
    },
    handleMouseEnter() {
      hover = true;
      this.updateBarProgress();
    },
    handleMouseLeave() {
      hover = false;
      this.updateBarProgress();
    },
    handleInput() {
      hover = true;
      this.updateBarProgress();
      this.changeVolumeLevel(this.volumeLevel);
    }
  }
};
</script>

<style lang="scss">
.now-playing-bar__extra-control {
  width: 18rem;
  min-width: 18rem;
  margin: 0 1rem 0rem 0.75rem;
  display: flex;
  flex-direction: row;
}

.extra-control__volume-control {
  width: 12rem;
  min-width: 12rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-left: auto;
}

.volume-control_slider {
  width: 100%;
  height: 1rem;
  margin: 0 0 0 0.75rem;
  display: flex;
  align-items: center;

  &:hover input[type="range"]::-webkit-slider-thumb {
    width: 0.75rem;
    height: 0.75rem;
    margin-top: -0.25rem;
    border-radius: 50%;
    background: #ffffff;
    cursor: pointer;
  }

  input {
    width: 100%;
  }
}
</style>
