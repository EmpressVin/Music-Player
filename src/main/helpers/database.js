/**
 * Perform a 'where' query on database table to return ID of record if it exists
 * @param   {QueryBuilder}  builder - Instance of knex QueryBuilder for the appropriate model
 * @param   {Object}        filter  - Object key-value pair used to filter the database table
 * @returns {(number|null)}           If record exists the id of the record otherwise null
 */
export const getIdIfExists = async (builder, filter) => {
  const res = await builder.select('id').where(filter);

  if (res.length === 0) return null;
  else return res[0].id;
};
