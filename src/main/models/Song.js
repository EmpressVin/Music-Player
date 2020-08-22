const { Model } = require('objection');
const tableNames = require('@/../constants/tableNames');

export class Song extends Model {
  static get tableName() {
    return tableNames.song;
  }

  static get relationMappings() {
    return {
      album: {
        relation: Model.BelongsToOneRelation,
      },
    };
  }
}
