import { Model } from 'objection';
import tableNames from 'Constants/tableNames';

// Import all the related models
import Song from './Song';
import Artist from './Artist';
import Label from './Label';

export default class Album extends Model {
  static get tableName() {
    return tableNames.album;
  }

  static get relationMappings() {
    return {
      songs: {
        relation: Model.HasManyRelation,
        modelClass: Song,
        join: {
          from: `${tableNames.album}.id`,
          to: `${tableNames.song}.album_id`,
        },
      },
      artists: {
        relation: Model.ManyToManyRelation,
        modelClass: Artist,
        join: {
          from: `${tableNames.album}.id`,
          through: {
            from: `${tableNames.album_artist}.album_id`,
            to: `${tableNames.album_artist}.artist_id`,
            extra: ['order'],
          },
          to: `${tableNames.artist}.id`,
        },
      },
      labels: {
        relation: Model.ManyToManyRelation,
        modelClass: Label,
        join: {
          from: `${tableNames.album}.id`,
          through: {
            from: `${tableNames.album_label}.album_id`,
            to: `${tableNames.album_label}.label_id`,
          },
          to: `${tableNames.label}.id`,
        },
      },
    };
  }
}
