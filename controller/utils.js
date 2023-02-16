const mongodb = require('mongodb');

/**
 * Filter query values from a req.query.
 * Ignore any unwanted query values and
 * return only the ones specificed by
 * the type[] parameter.
 *
 * @param   {string[]} types Array with name of query values that need to be found.
 * @param   {req.query} query The full list of query parameters sent by the user.
 * @returns {query[]} Filtered query values.
 */
const findQueryParams = (types, query) => {
  // console.log(query);
  let fixedQuery = {};
  const size = Object.keys(query).length;
  if (size > 0) {
    if (size > 5) {
      throw `Bad query request`;
    }
    for (let entry in query) {
      // console.log(entry);
      for (let i in types) {
        if (entry == types[i]) {
          fixedQuery[entry] = query[entry];
        }
      }
    }
  }
  return fixedQuery;
};

/**
 * Validates the values of a JSON body by
 * following the rules establish by a \
 * Mongoose Schema.
 *
 * @param   data A mongoose.schema variable
 * @returns An empty array or and array with erros.
 */
const validateBody = (data) => {
  try {
    const response = data.validateSync();
    if (response === undefined) {
      return [];
    } else {
      let validation_errors = [];
      for (let key in response.errors) {
        // console.log(response.errors[key].message);
        validation_errors.push(response.errors[key].message);
      }
      return validation_errors;
    }
  } catch (err) {
    console.log(err);
  }
};

/**
 * Validate that a given ID is valid to use
 * in the database.
 *
 * @param   {string}id An ID
 * @returns {boolean} True or False.
 */
const validateId = (id) => {
  if (typeof id === 'string' || id instanceof String) {
    return mongodb.ObjectId.isValid(id);
  } else {
    throw 'Invalid ID datatype';
  }
};

module.exports = { findQueryParams, validateBody, validateId };
