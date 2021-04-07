const { features } = require('../utils/features');

/**
 * Commercial Electric managed models.
 */
const CommercialElectric = {
  brand: 'Commercial Electric',
  models: {
    '53170161': [features.light, features.brightness, features.color_temperature],
  },
};

module.exports = {
  CommercialElectric,
};
