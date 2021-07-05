const { features } = require('../utils/features');

/**
 * Paul Neuhaus managed models.
 */
const PaulNeuhaus = {
  brand: 'Paul Neuhaus',
  models: {
    '100.424.11': [features.light, features.brightness, features.color_temperature],
    '100.110.39': [features.light, features.brightness, features.color_temperature, features.color],
    '100.425.90': [features.switch],
  },
};

module.exports = {
  PaulNeuhaus,
};
