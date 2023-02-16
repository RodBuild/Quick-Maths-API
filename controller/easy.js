const model = require('../models/easy_challenge');
const { findQueryParams, validateBody, validateId } = require('./utils');
const ObjectId = require('mongodb').ObjectId;

/**
 * Get all entries in the database
 * @Optional: You can pass up to 5 query values
 */
const getAll = async (req, res) => {
  try {
    const query = findQueryParams(['points', 'answer'], req.query);
    if (Object.keys(query).length > 0) {
      const result = await model.find(query);
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result);
    } else {
      const result = await model.find({});
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result);
    }
  } catch (err) {
    res.status(500).json(`Something went wrong: ${err}`);
  }
};

/**
 * Get one entry in the database by using the ID
 */
const getOne = async (req, res) => {
  try {
    if (validateId(req.params.id) === false) {
      throw 'Invalid ID';
    }
    const id = ObjectId(req.params);
    const result = await model.findById(id);
    if (result === null) {
      res.status(404).json(`Data not found`);
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result);
    }
  } catch (err) {
    res.status(500).json(`Something went wrong: ${err}`);
  }
};

/**
 * Create a new entry in the database
 */
const createOne = async (req, res) => {
  try {
    // We only need a max of 6 elements when creating an entry
    if (Object.keys(req.body).length > 6) {
      throw 'check JSON body';
    }
    await model.create(req.body);
    res.status(200).json(`Entry created successfully`);
  } catch (err) {
    let errors = err;
    if (err.errors) {
      errors = [];
      for (let key in err.errors) {
        console.log(err.errors[key].message);
        errors.push(err.errors[key].message);
      }
    }
    res.status(500).json(`Something went wrong: ${errors}`);
  }
};

/**
 * Update one entry in the database by using the ID
 */
const updateOne = async (req, res) => {
  try {
    // Validate the ID
    if (validateId(req.params.id) === false) {
      throw 'Invalid ID';
    }
    const id = ObjectId(req.params.id);

    // Validate the JSON being passed by the user
    const newData = new model(req.body);
    const errors = validateBody(newData);
    if (errors.length > 0) {
      throw errors;
    }

    // No erros found, so we find entry and update
    model.findByIdAndUpdate(id, req.body, { new: true }, (err, docs) => {
      if (err) {
        console.log(err);
        res.status(500).json(`Something went wrong`);
      } else {
        console.log('Updated : ', docs);
        if (docs === null) {
          res.status(404).json(`Data not found`);
        } else {
          res.status(200).json(`Data updated successfully`);
        }
      }
    });
  } catch (err) {
    res.status(500).json(`Something went wrong: ${err}`);
  }
};

/**
 * Delete one entry in the database by using the ID
 */
const deleteOne = async (req, res) => {
  try {
    // Validate the ID
    if (validateId(req.params.id) === false) {
      throw 'Invalid ID';
    }
    const id = ObjectId(req.params.id);
    model.findByIdAndRemove(id, function (err, docs) {
      if (err) {
        console.log(err);
        res.status(500).json(`Something went wrong`);
      } else {
        console.log('Deleted : ', docs);
        if (docs === null) {
          res.status(404).json(`Data not found`);
        } else {
          res.status(200).json(`Data deleted successfully`);
        }
      }
    });
  } catch (err) {
    res.status(500).json(`Something went wrong: ${err}`);
  }
};

module.exports = { getAll, getOne, createOne, updateOne, deleteOne };
