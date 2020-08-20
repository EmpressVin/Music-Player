import knex from "../loaders/knex";

import tableNames from "../../constants/tableNames";

// Import Knex helper functions
import { getIdIfExists } from "../helpers/knex";

export default class LabelService {
  static async addLabel(obj) {
    let labelId = await getIdIfExists(tableNames.label, { name: obj.name });

    if (labelId == null) {
      labelId = await knex(tableNames.label).insert(obj);

      console.log(labelId);
    }
  }
}
