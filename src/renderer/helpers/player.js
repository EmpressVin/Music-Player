import { Howl } from "howler";

class Player {
  constructor() {
    this.current = null;
  }

  play(path) {
    if (this.current !== null) {
      this.current.unload();
    }

    this.current = new Howl({
      src: [`local://${path}`]
    });
    this.current.play();
  }

  resume() {
    if (this.current !== null) {
      this.current.play();
    }
  }

  pause() {
    if (this.current !== null) {
      this.current.pause();
    }
  }
}

export default new Player();
