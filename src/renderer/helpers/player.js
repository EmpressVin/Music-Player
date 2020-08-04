import { Howl } from "howler";

const notifySongStarted = duration => {
  Event.$emit("song-started", duration);
};

const notifySongPlaying = position => {
  Event.$emit("song-playing", position);
};

const notifySongPaused = position => {
  Event.$emit("song-paused", position);
};

class Player {
  constructor() {
    this.current = null;
    this.volumeLevel = 1;
  }

  play(path) {
    if (this.current !== null) {
      this.current.unload();
    }

    this.current = new Howl({
      src: `local://${path}`,
      volume: this.volumeLevel,
      autoplay: true,
      html5: true
    });

    this.current.once("load", () => {
      notifySongStarted(this.current.duration());
    });
  }

  resume() {
    if (this.current !== null) {
      const positon = this.getPosition();
      this.current.play();
      notifySongPlaying(positon);
    }
  }

  pause() {
    if (this.current !== null) {
      this.current.pause();
      notifySongPaused(this.getPosition());
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

export default new Player();
