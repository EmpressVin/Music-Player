import { dialog, ipcMain } from 'electron';
import * as Vibrant from 'node-vibrant';
import * as mm from 'music-metadata';

// Import service class
import Album from './services/album';
import Song from './services/song';

// Import helper functions
import { getAllMusicFilePaths } from './helpers/filesystem';

export default () => {
  ipcMain.on("index-music-library", async event => { //eslint-disable-line
    // Electron function to show an open directory dialog to user
    const openObj = await dialog.showOpenDialog({
      properties: ['openDirectory'],
    });

    // If the user selected a valid directory
    if (!openObj.canceled) {
      const filePaths = await getAllMusicFilePaths(openObj.filePaths[0]);
      // let currentAlbumId = await Album.nextId();

      for (let i = 0; i < filePaths.length; ++i) {
        const fp = filePaths[i];
        const parsedMetadata = await mm.parseFile(fp);
        const albumObj = {
          name: parsedMetadata.common.album,
          year: parsedMetadata.common.year,
          date: parsedMetadata.common.date,
        };

        // Check if the album is already in database
        // If it is there is no need to add the album data again
        let albumId = await Album.getId(albumObj.name, albumObj.year);
        if (albumId == null) {
          const albumCoverArt = parsedMetadata.common.picture[0].data;
          const palette = await Vibrant.from(albumCoverArt).getPalette();
          const [red, green, blue] = palette.Vibrant.getRgb();

          albumObj.color = `${red}, ${green}, ${blue}`;

          // await saveAlbumArtwork(albumCoverArt, currentAlbumId);

          // currentAlbumId++;
          const albumArtists = parsedMetadata.common.albumartist.split('; ');
          const artistsData = albumArtists.map((artist, index) => {
            return { name: artist, order: index };
          });

          albumId = await Album.insertWithArtists(albumObj, artistsData);
          console.log(albumId);
          // await Album.addArtists(albumId, albumArtists);
        }

        // const songObj = {
        //   title: parsedMetadata.common.title,
        //   album_id: albumId,
        //   isrc_code:
        //     parsedMetadata.common.isrc == undefined
        //       ? undefined
        //       : parsedMetadata.common.isrc[0],
        //   year: parsedMetadata.common.year,
        //   date: parsedMetadata.common.date,
        //   path: fp,
        // };

        // if ((await Song.exists(songObj)) != null) continue;
        // const songId = await Song.insert(songObj, true);

        // const songArtists = parsedMetadata.common.artist.split('; ');

        // await Song.addArtists(songId, songArtists);
      }
    }
  });

  ipcMain.on('req-song-by-id', async (event, id) => {
    const res = await Song.getById(id);

    event.reply('res-song-by-id', res);
  });

  ipcMain.on('req-all-albums', async event => {
    const res = await Album.getWithArtist();

    event.reply('res-all-albums', res);
  });

  ipcMain.on('req-album-info', async (event, id) => {
    const res = await Album.getWithArtist(id);

    event.reply('res-album-info', res[0]);
  });

  ipcMain.on('req-all-album-songs', async (event, id) => {
    const res = await Song.getFromAlbum(id);

    event.reply('res-all-album-songs', res);
  });
};
