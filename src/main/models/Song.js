import { Model } from 'objection';
import tableNames from '@/../constants/tableNames';

// Import all the related models
import Album from './Album';
import Artist from './Artist';

export default class Song extends Model {
  static get tableName() {
    return tableNames.song;
  }

  static get relationMappings() {
    return {
      album: {
        relation: Model.BelongsToOneRelation,
        modelClass: Album,
        join: {
          from: `${tableNames.song}.album_id`,
          to: `${tableNames.album}.id`,
        },
      },
      artists: {
        relation: Model.ManyToManyRelation,
        modelClass: Artist,
        join: {
          from: `${tableNames.song}.id`,
          through: {
            from: `${tableNames.song_artist}.song_id`,
            to: `${tableNames.song_artist}.artist_id`,
          },
          to: `${tableNames.artist}.id`,
        },
      },
    };
  }
}
