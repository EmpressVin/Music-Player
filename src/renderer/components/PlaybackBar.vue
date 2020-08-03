<template>
  <div class="player-control__playback-bar">
    <span>{{ convertTime(playbackPosition) }}</span>
    <div
      class="playback-bar__slider"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <input
        type="range"
        min="0"
        :max="playbackDuration"
        step="0.1"
        ref="slider"
        v-model.number="playbackPosition"
        @mouseup="handleMouseUp"
        @mousedown="handleMouseDown"
        @input="handleInput"
      />
    </div>
    <span>{{ convertTime(playbackDuration) }}</span>
  </div>
</template>

<script>
let hover = false;

export default {
  name: "PlaybackBar",
  data() {
    return {
      playbackPosition: 0,
      playbackDuration: 0,
      playbackTimer: null,
      isPlaying: false
    };
  },
  created() {
    window.Event.$on("song-started", duration => {
      this.playbackPosition = 0;
      this.playbackDuration = duration;
      this.isPlaying = true;

      this.stopTimer();

      this.updateBarProgress();
      this.startTimer();
    });

    window.Event.$on("song-playing", position => {
      this.startTimer();

      this.playbackPosition = position;
      this.isPlaying = true;
    });

    window.Event.$on("song-paused", position => {
      this.stopTimer();

      this.playbackPosition = position;
      this.isPlaying = false;
    });
  },
  methods: {
    updateBarProgress() {
      const color = hover === false ? "#b3b3b3" : "#1db954";
      const percent = (this.playbackPosition / this.playbackDuration) * 100;

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
    handleMouseUp() {
      window.Event.$emit("seek-song", this.playbackPosition);

      if (this.isPlaying) this.startTimer();
    },
    handleMouseDown() {
      this.stopTimer();
    },
    handleInput() {
      hover = true;
      this.updateBarProgress();
    },
    startTimer() {
      this.playbackTimer = setInterval(() => {
        this.playbackPosition += 0.5;
        this.updateBarProgress();

        if (
          Math.floor(this.playbackPosition) ===
          Math.floor(this.playbackDuration)
        ) {
          this.stopTimer();
        }
      }, 500);
    },
    stopTimer() {
      if (this.playbackTimer !== null) {
        clearInterval(this.playbackTimer);
        this.playbackTimer = null;
      }
    },
    convertTime(time) {
      const min = Math.floor(time / 60);
      const sec = Math.floor(time % 60);
      const secString = sec < 10 ? `0${sec}` : `${sec}`;

      return `${min}:${secString}`;
    }
  }
};
</script>

<style lang="scss">
.player-control__playback-bar {
  margin-top: 0.5rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 0.75rem;

  span {
    width: 2rem;
    margin: auto;
    display: flex;
    justify-content: center;
    font-size: 0.7rem;
  }
}

.playback-bar__slider {
  width: 100%;
  height: 1rem;
  margin: 0 0.75rem;
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
