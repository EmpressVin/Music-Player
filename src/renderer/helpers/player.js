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
  }

  play(path) {
    if (this.current !== null) {
      this.current.unload();
    }

    this.current = new Howl({
      src: `local://${path}`,
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

  getPosition() {
    const pos = this.current.seek();
    return pos;
  }
}

export default new Player();
