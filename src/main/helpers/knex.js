import knex from '../loaders/knex';

/** @param {Knex} knex **/
export const getIdIfExists = async (tableName, options) => {
  const res = await knex(tableName)
    .select('id')
    .where(options);

  if (res.length === 0) return null;
  else return res[0].id;
};
