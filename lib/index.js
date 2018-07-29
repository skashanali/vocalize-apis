var _ = require('lodash');

exports.scanQueryParams = (queryParams, acceptedKeys, excludeKeys, res) => {
  if(!queryParams.query){
    queryParams.query = "{}";
  }

  //Pick valid keys
  let query = {}, validFields = _.pick(JSON.parse(queryParams.query), acceptedKeys);

  _.each(validFields, function removeUndefined(value, key) {
    //Remove blank or undefined keys
    if (!value || value == '[]' || value == '{}') {
      delete validFields[key];
    }
  });

  let offset = validFields['offset'];
  if(offset && !_.isNumber(offset))
      return res.status(422).json({message : 'offset should be a number.'});

  let limit = validFields['limit']
  if(limit && !_.isNumber(limit))
      return res.status(422).json({message : 'limit should be a number.'});
      
  let attributes = validFields['attributes'];
  if(attributes && !_.isArray(attributes))
  return res.status(422).json({message : 'attributes should be an array.'});
      
  let order = validFields['order'] || {};
  if(order && !_.isObject(order))
      return res.status(422).json({message : 'order should be an object.'});
  order = Object.keys(order).map((key) => {
      return [key, obj[key]];
  });
  
  // Remove from query
  validFields = _.omit(validFields, excludeKeys);

  //Merge both objects
  query = _.extend(query, validFields);

  return {query, offset, limit, attributes, order}
}
