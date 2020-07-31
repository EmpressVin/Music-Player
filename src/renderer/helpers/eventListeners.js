import Player from "./player";

export default () => {
  Event.$on("play-song", songPath => {
    console.log(songPath);
    Player.play(songPath);
  });
};
