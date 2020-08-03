import Player from "./player";

export default () => {
  Event.$on("play-song", songPath => {
    Player.play(songPath);
  });

  Event.$on("resume-song", () => {
    Player.resume();
  });

  Event.$on("pause-song", () => {
    Player.pause();
  });

  Event.$on("seek-song", seconds => {
    Player.seek(seconds);
  });
};
