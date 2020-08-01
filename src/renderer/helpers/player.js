import { Howl } from "howler";

const notifySongPlaying = () => {
  Event.$emit("song-playing");
};

const notifySongPaused = () => {
  Event.$emit("song-paused");
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
      console.log(this.current.duration());
    });

    notifySongPlaying();
  }

  resume() {
    if (this.current !== null) {
      this.current.play();
      notifySongPlaying();
    }
  }

  pause() {
    if (this.current !== null) {
      this.current.pause();
      notifySongPaused();
    }
  }
}

export default new Player();
