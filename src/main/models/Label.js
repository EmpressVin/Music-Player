import { Model } from 'objection';
import tableNames from '@/../constants/tableNames';

// Import all the related models
import Album from './Album';

export default class Label extends Model {
  static get tableName() {
    return tableNames.label;
  }

  static get relationMappings() {
    return {
      albums: {
        relation: Model.ManyToManyRelation,
        modelClass: Album,
        join: {
          from: `${tableNames.label}.id`,
          through: {
            from: `${tableNames.album_label}.label_id`,
            to: `${tableNames.album_label}.album_id`,
          },
          to: `${tableNames.album}.id`,
        },
      },
    };
  }
}
