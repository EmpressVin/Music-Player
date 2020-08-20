import knex from "../loaders/knex";

import tableNames from "../../constants/tableNames";

// Import other services
import Artist from "./artist";

// Import Knex helper functions
import { getIdIfExists } from "../helpers/knex";

export default class AlbumService {
  static async insert(obj, skipCheck = false) {
    let albumId = null;

    if (!skipCheck) {
      albumId = await getIdIfExists(tableNames.album, {
        name: obj.name,
        year: obj.year
      });
    }

    if (albumId == null) {
      const res = await knex(tableNames.album).insert(obj);
      albumId = res[0];
    }

    return albumId;
  }

  static async exists(obj) {
    return await getIdIfExists(tableNames.album, {
      name: obj.name,
      year: obj.year
    });
  }

  static async nextId() {
    const res = await knex("SQLITE_SEQUENCE")
      .select()
      .where("name", tableNames.album);

    if (res.length < 1) return 0;
    else return res[0].seq;
  }

  static async getWithArtist(id = null) {
    const query = knex(tableNames.album)
      .join(tableNames.album_artist, "album.id", "=", "album_artist.album_id")
      .join(tableNames.artist, "album_artist.artist_id", "=", "artist.id")
      .select(
        "album.id as album_id",
        "album.name as album_name",
        "album.year as album_year",
        "album.color as album_color",
        "artist.name as artist_name"
      );

    let res;

    if (id !== null) {
      res = await query.where("album.id", id);
    } else {
      res = await query;
    }

    return res;
  }

  static async addArtists(id, artists) {
    for (let i = 0; i < artists.length; ++i) {
      const artistId = await Artist.insert({ name: artists[i] });
      await knex(tableNames.album_artist).insert({
        album_id: id,
        artist_id: artistId
      });
    }
  }
}
