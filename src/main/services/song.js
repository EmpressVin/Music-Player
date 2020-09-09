import knex from '#/loaders/database';

import tableNames from 'Constants/tableNames';

// Import other services
import Artist from './artist';

// Import Knex helper functions
import { getIdIfExists } from '#/helpers/database';

export default class SongService {
  static async insert(obj, skipCheck = false) {
    let songId = null;

    if (!skipCheck) {
      songId = await getIdIfExists(tableNames.song, {
        title: obj.title,
        album_id: obj.album_id,
      });
    }

    if (songId == null) {
      const res = await knex(tableNames.song).insert(obj);
      songId = res[0];
    }

    return songId;
  }

  static async exists(obj) {
    const songId = await getIdIfExists(tableNames.song, {
      title: obj.title,
      album_id: obj.album_id,
    });

    return songId;
  }

  static async getById(id) {
    return await knex(tableNames.song)
      .join(tableNames.song_artist, 'song.id', '=', 'song_artist.song_id')
      .join(tableNames.artist, 'song_artist.artist_id', '=', 'artist.id')
      .select(
        'song.id as song_id',
        'song.title as song_title',
        'song.path as song_path',
        'song.album_id as album_id',
        'artist.id as artist_id',
        'artist.name as artist_name'
      )
      .where('song.id', id);
  }

  static async getFromAlbum(id) {
    return await knex(tableNames.song)
      .join(tableNames.song_artist, 'song.id', '=', 'song_artist.song_id')
      .join(tableNames.artist, 'song_artist.artist_id', '=', 'artist.id')
      .select(
        'song.id as song_id',
        'song.title as song_title',
        'song.path as song_path',
        'artist.id as artist_id',
        'artist.name as artist_name'
      )
      .where('song.album_id', id);
  }

  static async addArtists(id, artists) {
    for (let i = 0; i < artists.length; ++i) {
      const artistId = await Artist.insert({ name: artists[i] });
      await knex(tableNames.song_artist).insert({
        song_id: id,
        artist_id: artistId,
      });
    }
  }
}
