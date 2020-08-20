const Knex = require("knex"); //eslint-disable-line

const tableNames = require("../../src/constants/tableNames");

const addForeignKey = (table, column, foreignColumn) => {
  table.integer(column).unsigned();
  table
    .foreign(column)
    .references(foreignColumn)
    .onDelete("cascade");
};

const createSimpleNameTable = (knex, tableName) => {
  return knex.schema.createTable(tableName, table => {
    table.increments().notNullable();
    table
      .string("name", 127)
      .notNullable()
      .unique();
  });
};

const createJoinTable = (knex, tableName, columnNames, foreignColumnNames) => {
  return knex.schema.createTable(tableName, table => {
    for (let i = 0; i < columnNames.length; ++i) {
      addForeignKey(table, columnNames[i], foreignColumnNames[i]);
    }

    table.primary(columnNames);
  });
};

const dropTable = (knex, tableName) => {
  return knex.schema.dropTable(tableName);
};

/** @param {Knex} knex **/
exports.up = async knex => {
  await Promise.all([
    createSimpleNameTable(knex, tableNames.artist),
    createSimpleNameTable(knex, tableNames.label),
    knex.schema.createTable(tableNames.album, table => {
      table.increments().notNullable();
      table.string("name", 127).notNullable();
      table.string("color", 7).notNullable();
      table.integer("year");
      table.date("date");
    })
  ]);

  await knex.schema.createTable(tableNames.song, table => {
    table.increments().notNullable();
    table
      .text("path")
      .notNullable()
      .unique();
    table.string("title", 127).notNullable();
    table.string("isrc_code", 12);
    table.integer("year");
    table.date("date");
    addForeignKey(table, "album_id", "album.id");
  });

  await Promise.all([
    createJoinTable(
      knex,
      tableNames.song_artist,
      ["song_id", "artist_id"],
      ["song.id", "artist.id"]
    ),
    createJoinTable(
      knex,
      tableNames.album_artist,
      ["album_id", "artist_id"],
      ["album.id", "artist.id"]
    ),
    createJoinTable(
      knex,
      tableNames.album_label,
      ["album_id", "label_id"],
      ["album.id", "label.id"]
    )
  ]);
};

/** @param {Knex} knex **/
exports.down = async knex => {
  await Promise.all([
    dropTable(knex, tableNames.artist),
    dropTable(knex, tableNames.label),
    dropTable(knex, tableNames.album)
  ]);

  await dropTable(knex, tableNames.song);

  await Promise.all([
    dropTable(knex, tableNames.song_artist),
    dropTable(knex, tableNames.album_artist),
    dropTable(knex, tableNames.album_label)
  ]);
};
