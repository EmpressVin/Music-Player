import knex from "../loaders/knex";

import tableNames from "../../constants/tableNames";

// Import Knex helper functions
import { getIdIfExists } from "../helpers/knex";

export default class ArtistService {
  static async insert(obj) {
    let artistId = await getIdIfExists(tableNames.artist, { name: obj.name });

    if (artistId == null) {
      const res = await knex(tableNames.artist).insert(obj);
      artistId = res[0];
    }

    return artistId;
  }
}
