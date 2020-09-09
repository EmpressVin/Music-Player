import knex from '#/loaders/database';

import tableNames from 'Constants/tableNames';

// Import Knex helper functions
import { getIdIfExists } from '#/helpers/database';

export default class LabelService {
  static async addLabel(obj) {
    let labelId = await getIdIfExists(tableNames.label, { name: obj.name });

    if (labelId == null) {
      labelId = await knex(tableNames.label).insert(obj);

      console.log(labelId);
    }
  }
}
