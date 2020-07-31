import { dialog, ipcMain } from "electron";

import * as mm from "music-metadata";

// Import service class
import Album from "../services/album";
import Song from "../services/song";

// Import helper functions
import { getAllMusicFilePaths } from "./filesystem";

export const a = async () => {
  const openObj = await dialog.showOpenDialog({
    properties: ["openDirectory"]
  });

  if (!openObj.canceled) {
    const filePaths = await getAllMusicFilePaths(openObj.filePaths[0]);

    for (let i = 0; i < filePaths.length; ++i) {
      const fp = filePaths[i];
      const parsedMetadata = await mm.parseFile(fp);
      const albumObj = {
        name: parsedMetadata.common.album,
        year: parsedMetadata.common.year,
        date: parsedMetadata.common.date
      };

      let albumId = await Album.exists(albumObj);
      if (albumId == null) {
        albumId = await Album.insert(
          { ...albumObj, album_art: parsedMetadata.common.picture[0].data },
          true
        );
        const albumArtists = parsedMetadata.common.albumartist.split("; ");
        await Album.addArtists(albumId, albumArtists);
      }

      const songObj = {
        title: parsedMetadata.common.title,
        album_id: albumId,
        isrc_code:
          parsedMetadata.common.isrc == undefined
            ? undefined
            : parsedMetadata.common.isrc[0],
        year: parsedMetadata.common.year,
        date: parsedMetadata.common.date,
        path: fp
      };

      if ((await Song.exists(songObj)) != null) continue;
      const songId = await Song.insert(songObj, true);

      const songArtists = parsedMetadata.common.artist.split("; ");

      await Song.addArtists(songId, songArtists);
    }
  }
};
