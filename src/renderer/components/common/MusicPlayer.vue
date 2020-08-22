<template>
  <div class="w-full h-full"><slot></slot></div>
</template>

<script>
// Import Vuex store related items
import { mapGetters } from 'vuex';
import { mapMutations } from 'vuex';

// Import the library that will play music
import { Howl } from 'howler';

// Create a class for the music player
class Player {
  static current = null;
  static volumeLevel = 1;

  static play(path, setPlaying) {
    if (this.current !== null) {
      this.current.unload();
    }

    this.current = new Howl({
      src: `local://${path}`,
      volume: this.volumeLevel,
      autoplay: true,
      html5: true,
    });

    this.current.once('load', () => {
      setPlaying(true);
    });
  }

  static resume(setPlaying) {
    if (this.current !== null && this.current.playing() === false) {
      this.current.play();
      setPlaying(true);
    }
  }

  static pause(setPlaying) {
    if (this.current !== null && this.current.playing() === true) {
      this.current.pause();
      setPlaying(false);
    }
  }

  seek(seconds) {
    if (this.current !== null) {
      this.current.seek(seconds);
    }
  }

  volume(volume) {
    this.volumeLevel = volume;

    if (this.current !== null) {
      this.current.volume(volume);
    }
  }

  mute(state) {
    if (this.current !== null) {
      this.current.mute(state);
    }
  }

  getPosition() {
    const pos = this.current.seek();
    return pos;
  }
}

export default {
  name: 'MusicPlayer',
  data() {
    return {
      test: 'hi',
    };
  },
  computed: {
    ...mapGetters({
      currentSong: 'Player/getCurrentSong',
      isPlaying: 'Player/isPlaying',
    }),
  },
  watch: {
    // When current song changes play the new song
    currentSong(newSong) {
      Player.play(newSong.path, this.setPlaying);
    },
    // When player state changes resume or pause song
    isPlaying(newState) {
      if (newState === false) Player.pause(this.setPlaying);
      else Player.resume(this.setPlaying);
    },
  },
  methods: {
    ...mapMutations({
      setPlaying: 'Player/SET_PLAYING',
    }),
    t() {
      this.test = 'Bye';
    },
  },
};
</script>
