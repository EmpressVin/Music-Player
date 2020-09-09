// import knex from '#/loaders/database';

// Database related imports
import Album from '#/models/Album';
// import tableNames from 'Constants/tableNames';
import { UniqueViolationError } from 'objection';

// // Import other services
// import Artist from './artist';

export default class AlbumService {
  /**
   * Get the ID of an album in the database if it exists
   * @param   {string}      name - Name of the album
   * @param   {number}      year - Release year of the album
   * @returns {number|null}        ID of album if it exists otherwise null
   */
  static async getId(name, year) {
    const res = await Album.query()
      .select('id')
      .where('name', name)
      .where('year', year);

    if (res.length === 0) return null;
    else return res[0].id;
  }

  /**
   * Inserts a new album and associated artists into the database
   * @param   {Object}   album           - Data of the new album to be inserted into the database
   * @param   {string}   album.name      - The name of the album
   * @param   {number}   album.year      - The release year of the album
   * @param   {string}   album.color     - Hex representation of the most prominent color in album cover art
   * @param   {string}   album.date      - The release date of the album
   * @param   {Object[]} artists         - An array of album artists
   * @param   {string}   artists[].name  - The name of an artist
   * @param   {number}   artists[].order - The display order of artist on album
   * @returns {number}                    ID of the newly inserted album
   */
  static async insertWithArtists(album, artists) {
    try {
      const res = await Album.query().upsertGraph(
        {
          ...album,
          artists,
        },
        {
          relate: true,
        }
      );

      return res.id;
    } catch (error) {
      console.log(error instanceof UniqueViolationError);
    }
  }

  // static async exists(obj) {
  //   return await getIdIfExists(tableNames.album, {
  //     name: obj.name,
  //     year: obj.year,
  //   });
  // }

  // static async nextId() {
  //   const res = await knex('SQLITE_SEQUENCE')
  //     .select()
  //     .where('name', tableNames.album);

  //   if (res.length < 1) return 0;
  //   else return res[0].seq;
  // }

  // static async getWithArtist(id = null) {
  //   const query = knex(tableNames.album)
  //     .join(tableNames.album_artist, 'album.id', '=', 'album_artist.album_id')
  //     .join(tableNames.artist, 'album_artist.artist_id', '=', 'artist.id')
  //     .select(
  //       'album.id as album_id',
  //       'album.name as album_name',
  //       'album.year as album_year',
  //       'album.color as album_color',
  //       'artist.name as artist_name'
  //     );

  //   let res;

  //   if (id !== null) {
  //     res = await query.where('album.id', id);
  //   } else {
  //     res = await query;
  //   }

  //   return res;
  // }

  // static async addArtists(id, artists) {
  //   for (let i = 0; i < artists.length; ++i) {
  //     const artistId = await Artist.insert({ name: artists[i] });
  //     await knex(tableNames.album_artist).insert({
  //       album_id: id,
  //       artist_id: artistId,
  //     });
  //   }
  // }
}
