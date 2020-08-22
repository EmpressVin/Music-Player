// Used to get path to the app's data folder on the user's system
import * as ap from 'appdata-path';

export const getAppDataPath = () => {
  return ap('music-player');
};

export const getAlbumCoverPath = id => {
  return `local://${getAppDataPath()}\\Artwork\\Albums\\${id}.jpg`;
};
