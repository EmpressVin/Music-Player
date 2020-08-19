// Import the library that will play music
import { Howl } from "howler";

// Create a class for the music player
export default class MusicPlayer { //eslint-disable-line
  static current = null;
  static volumeLevel = 1;
  static timer = null;
  static seekTime = null;

  static play({ path, onSuccess, onTick, onEnd }) {
    if (this.current !== null) {
      this.current.unload();
      clearInterval(this.timer);
    }

    this.current = new Howl({
      src: `local://${path}`,
      volume: this.volumeLevel,
      autoplay: true,
      html5: true,
      onplay: () => this.startTimer(this.current.seek(), onTick),
      onpause: () => clearInterval(this.timer),
      onseek: () => {
        if (this.current.playing()) {
          clearInterval(this.timer);
          this.startTimer(this.seekTime, onTick);
        }
      },
      onend: () => {
        clearInterval(this.timer);
        onEnd();
      }
    });

    this.current.once("load", () => {
      onSuccess(this.current.duration());
    });
  }

  static resume(onSuccess) {
    if (this.current !== null && this.current.playing() === false) {
      this.current.play();
      onSuccess();
    }
  }

  static pause(onSuccess) {
    if (this.current !== null && this.current.playing() === true) {
      this.current.pause();
      onSuccess(this.current.seek());
    }
  }

  static seek(time, onSuccess) {
    if (this.current !== null) {
      this.seekTime = time;
      this.current.seek(time);
      onSuccess();
    }
  }

  static volume(volume) {
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

  static startTimer(currentTime, onTick) {
    // Timeout needs to be set because when song is paused with fraction of a second left
    // This time out will make sure the timer is reset so it increments when the second is whole
    setTimeout(() => {
      onTick();
      this.timer = setInterval(onTick, 500);
    }, 500 - (currentTime % 0.5) * 1000);
  }
}
