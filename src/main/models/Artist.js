import { Model } from 'objection';
import tableNames from 'Constants/tableNames';

// Import all the related models
import Song from './Song';
import Album from './Album';

export default class Artist extends Model {
  static get tableName() {
    return tableNames.artist;
  }

  static get relationMappings() {
    return {
      songs: {
        relation: Model.ManyToManyRelation,
        modelClass: Song,
        join: {
          from: `${tableNames.artist}.id`,
          through: {
            from: `${tableNames.song_artist}.artist_id`,
            to: `${tableNames.song_artist}.song_id`,
            extra: ['order'],
          },
          to: `${tableNames.song}.id`,
        },
      },
      albums: {
        relation: Model.ManyToManyRelation,
        modelClass: Album,
        join: {
          from: `${tableNames.artist}.id`,
          through: {
            from: `${tableNames.album_artist}.artist_id`,
            to: `${tableNames.album_artist}.album_id`,
            extra: ['order'],
          },
          to: `${tableNames.album}.id`,
        },
      },
    };
  }
}
