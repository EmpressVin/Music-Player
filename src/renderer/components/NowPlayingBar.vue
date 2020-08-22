<template>
  <div class="App__now-playing-bar">
    <CurrentSongInfo></CurrentSongInfo>
    <div class="now-playing-bar__player-control">
      <div class="player-control__buttons">
        <button class="player-control-buttons__icon">
          <SvgIcon :path="shuffleFilledPath" />
        </button>
        <button
          class="player-control-buttons__icon--big player-control-buttons__icon--margin-left"
          @click="prevSong"
        >
          <SvgIcon :path="previousFilledPath" />
        </button>
        <button
          class="player-control-buttons__icon--large player-control-buttons__icon--margin-horizontal"
          v-show="!isPlaying"
          @click="resumeSong"
        >
          <SvgIcon :path="playOutlinedPath" />
        </button>
        <button
          class="player-control-buttons__icon--large player-control-buttons__icon--margin-horizontal"
          v-show="isPlaying"
          @click="pauseSong"
        >
          <SvgIcon :path="pauseOutlinedPath" />
        </button>
        <button
          class="player-control-buttons__icon--big player-control-buttons__icon--margin-right"
          @click="nextSong"
        >
          <SvgIcon :path="nextFilledPath" />
        </button>
        <button class="player-control-buttons__icon">
          <SvgIcon :path="repeatFilledPath" />
        </button>
      </div>
      <PlaybackBar></PlaybackBar>
    </div>
    <VolumeBar></VolumeBar>
  </div>
</template>

<script>
// Import Vuex store related items
import { mapGetters, mapActions } from 'vuex';

import CurrentSongInfo from './NowPlaying/SongInfo';
import PlaybackBar from './PlaybackBar';
import VolumeBar from './VolumeBar';
import SvgIcon from '@/components/ui/SvgIcon';

import * as IconPath from '@/../constants/iconPaths';

export default {
  name: 'NowPlayingBar',
  components: { CurrentSongInfo, PlaybackBar, VolumeBar, SvgIcon },
  data() {
    return {
      shuffleFilledPath: IconPath.SHUFFLE_FILLED,
      previousFilledPath: IconPath.PREVIOUS_FILLED,
      playOutlinedPath: IconPath.PLAY_OUTLINED,
      pauseOutlinedPath: IconPath.PAUSE_OUTLINED,
      nextFilledPath: IconPath.NEXT_FILLED,
      repeatFilledPath: IconPath.REPEAT_FILLED,
    };
  },
  computed: {
    ...mapGetters({
      isPlaying: 'Player/isPlaying',
      elapsedTime: 'Player/getElapsedTime',
      duration: 'Player/getDuration',
    }),
  },
  methods: {
    ...mapActions({
      pauseSong: 'Player/pauseSong',
      resumeSong: 'Player/resumeSong',
      nextSong: 'Player/nextSong',
      prevSong: 'Player/prevSong',
    }),
  },
};
</script>

<style lang="scss">
.App__now-playing-bar {
  width: 100%;
  height: 88px;
  background-color: #282828;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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

.player-control-buttons {
  &__icon {
    @include square-size(1.25rem);
    fill: $medium-emphasis;

    &:hover {
      fill: white;
    }

    &:focus {
      outline: none;
    }
  }

  &__icon--big {
    @include square-size(1.5rem);
    fill: $medium-emphasis;

    &:hover {
      fill: white;
    }

    &:focus {
      outline: none;
    }
  }

  &__icon--large {
    @include square-size(2.5rem);
    fill: $medium-emphasis;

    &:hover {
      fill: white;
    }

    &:focus {
      outline: none;
    }
  }

  &__icon--margin-left {
    @include margin($left: 1.75rem);
  }

  &__icon--margin-right {
    @include margin($right: 1.75rem);
  }

  &__icon--margin-horizontal {
    @include margin-axis($x: 1.75rem);
  }
}
</style>
