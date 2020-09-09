import Artist from '#/models/Artist';

// Import database helper functions
import { getIdIfExists } from '#/helpers/database';

export default class ArtistService {
  /**
   * Get the ID of an artist in the database if it exists
   * @param   {Object}      artist - Artist data that will be used to filter all artist records
   * @returns {number|null}          ID of artist record if it exists otherwise null
   */
  static async getId(data) {
    return await getIdIfExists(Artist.QueryBuilder, data);
  }

  /**
   * Inserts a new artist into the database
   * @param   {Object} artist      - Data of the new artist record to be inserted into the database
   * @param   {string} artist.name - The name of the artist
   * @returns {number}               ID of the newly inserted artist record
   */
  static async insert(artist) {
    const res = await Artist.query().insert.insert(artist);
    return res.id;
  }
}
