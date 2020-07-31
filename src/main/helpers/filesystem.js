import path from "path";
import { promises as fs } from "fs";

// Image manipulation library that will be used to resize and save images to disk
import Jimp from "jimp/es";

// Used to get path to the app's data folder on the user's system
import * as ap from "appdata-path";

const isMusicFile = fp => {
  return [".wav", ".mp3", ".flac"].includes(path.extname(fp));
};

export const getAppDataPath = () => {
  return ap("music-player");
};

export const getAllMusicFilePaths = async dp => {
  const filePaths = [];
  const files = await fs.readdir(dp);

  for (let i = 0; i < files.length; ++i) {
    const fn = files[i];

    const fullPath = path.join(dp, fn);

    const fileStats = await fs.lstat(fullPath);

    if (fileStats.isDirectory()) {
      const musicFiles = await getAllMusicFilePaths(fullPath);

      musicFiles.map(fp => filePaths.push(fp));
    } else if (isMusicFile(fullPath)) {
      filePaths.push(fullPath);
    }
  }

  return filePaths;
};

export const saveAlbumArtwork = async (buffer, id) => {
  const albumCoverPath = path.join(
    getAppDataPath(),
    `Artwork/Albums/${id + 1}.jpg`
  );

  Jimp.read(buffer)
    .then(img => {
      return img
        .resize(320, 320) // resize
        .quality(80) // set JPEG quality
        .write(albumCoverPath); // save
    })
    .catch(err => {
      console.error(err);
    });
};
