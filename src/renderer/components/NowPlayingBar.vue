<template>
  <div class="App__now-playing-bar">
    <div class="now-playing-bar__player-control">
      <div class="player-control__buttons">
        <button class="icon">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.272 10.264L3.52 12C3.056 12.464 2.248 12.8 1.6 12.8H0V11.2H1.6C1.832 11.2 2.24 11.04 2.4 10.872L4.136 9.128L5.272 10.264ZM12.8 3.2V0.800003L16 4L12.8 7.2V4.8H11.2C10.968 4.8 10.56 4.96 10.4 5.128L8.664 6.872L7.52 5.736L9.28 4C9.744 3.536 10.552 3.2 11.208 3.2H12.808H12.8ZM12.8 11.2V8.8L16 12L12.8 15.2V12.8H11.2C10.544 12.8 9.736 12.464 9.272 12L2.392 5.128C2.24 4.968 1.84 4.8 1.6 4.8H0V3.2H1.6C2.256 3.2 3.064 3.536 3.528 4L10.408 10.872C10.568 11.032 10.968 11.2 11.2 11.2H12.8Z"
            />
          </svg>
        </button>
        <button class="ml-8 icon">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4 5H7V15H4V5ZM16 5V15L7 10L16 5Z" />
          </svg>
        </button>
        <button class="ml-6 focus:outline-none" v-show="!isPlaying">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="play-btn"
            @click="resumeSong"
          >
            <circle cx="16" cy="16" r="15" />
            <path
              d="M22.8923 15.7539L11.0769 9.84616V21.6615L22.8923 15.7539Z"
              fill="white"
            />
          </svg>
        </button>
        <button class="ml-6 focus:outline-none" v-show="isPlaying">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="play-btn"
            @click="pauseSong"
          >
            <circle cx="16" cy="16" r="15" />
            <path d="M11 10H14V22H11V10ZM18 10H21V22H18V10Z" fill="white" />
          </svg>
        </button>
        <button class="ml-6 icon">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M13 5H16V15H13V5ZM4 5L13 10L4 15V5Z" />
          </svg>
        </button>
        <button class="ml-8 icon">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <path
                d="M14.5456 8.72713C14.1434 8.72713 13.8183 9.05295 13.8183 9.45442C13.8183 10.6573 12.8394 11.6363 11.6364 11.6363H5.81815V9.45442C5.81815 9.17514 5.65742 8.91988 5.40651 8.79913C5.1527 8.67841 4.85522 8.71185 4.63631 8.88641L0.999866 11.7956C0.827488 11.9337 0.727142 12.1425 0.727142 12.3636C0.727142 12.5847 0.827519 12.7934 0.999866 12.9316L4.63631 15.8407C4.76794 15.9454 4.92869 16 5.09085 16C5.19776 16 5.30614 15.976 5.40648 15.928C5.65739 15.8073 5.81811 15.552 5.81811 15.2727V13.0909H11.6364C13.6415 13.0909 15.2729 11.4596 15.2729 9.45442C15.2729 9.05295 14.9478 8.72713 14.5456 8.72713Z"
              />
              <path
                d="M1.45444 7.27256C1.85663 7.27256 2.18173 6.94674 2.18173 6.54526C2.18173 5.34233 3.16066 4.36341 4.36359 4.36341H10.1819V6.54526C10.1819 6.82455 10.3426 7.0798 10.5935 7.20055C10.6946 7.24856 10.8022 7.27256 10.9092 7.27256C11.0713 7.27256 11.2321 7.21802 11.3637 7.11327L15.0001 4.20413C15.1725 4.06594 15.2729 3.85721 15.2729 3.63612C15.2729 3.41502 15.1725 3.2063 15.0001 3.06811L11.3637 0.158963C11.1455 -0.0155716 10.8444 -0.0490409 10.5935 0.0716799C10.3426 0.192401 10.1819 0.447687 10.1819 0.726973V2.90882H4.36359C2.35846 2.90882 0.727142 4.54013 0.727142 6.54526C0.727142 6.94674 1.05224 7.27256 1.45444 7.27256Z"
              />
            </g>
          </svg>
        </button>
      </div>
      <PlaybackBar></PlaybackBar>
    </div>
  </div>
</template>

<script>
import PlaybackBar from "./PlaybackBar";

export default {
  name: "NowPlayingBar",
  components: { PlaybackBar },
  data() {
    return {
      isPlaying: false,
      playbackPosition: 0,
      playbackDuration: 0,
      playbackTimer: null
    };
  },
  created() {
    window.Event.$on("song-started", () => {
      this.isPlaying = true;
    });

    window.Event.$on("song-playing", () => {
      this.isPlaying = true;
    });

    window.Event.$on("song-paused", () => {
      this.isPlaying = false;
    });
  },
  methods: {
    resumeSong() {
      window.Event.$emit("resume-song");
    },
    pauseSong() {
      window.Event.$emit("pause-song");
    }
  }
};
</script>

<style lang="scss">
.App__now-playing-bar {
  width: 100%;
  height: 5.5rem;
  background-color: #282828;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.now-playing-bar__player-control {
  width: 100%;
  max-width: 64rem;
  display: flex;
  flex-direction: column;
}

.player-control__buttons {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.play-btn {
  stroke: #b3b3b3;
  transform: scale(1);

  &:hover {
    stroke: white;
    transform: scale(1.05);
  }
}

.icon {
  &:focus {
    outline: none;
  }

  svg {
    fill: #b3b3b3;

    &:hover {
      fill: white;
    }
  }
}
</style>
