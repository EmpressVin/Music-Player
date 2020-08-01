import Player from "./player";

export default () => {
  Event.$on("play-song", songPath => {
    Player.play(songPath);
  });

  Event.$on("resume-song", songPath => {
    Player.resume(songPath);
  });

  Event.$on("pause-song", songPath => {
    Player.pause(songPath);
  });
};
