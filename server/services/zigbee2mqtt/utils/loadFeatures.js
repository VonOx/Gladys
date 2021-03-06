const { features } = require('./features');
const { getFeaturesByModel } = require('../model');

/**
 * @description Retreive feature related to device.
 * @param {string} name - Device name.
 * @param {string} model - Device model.
 * @param {boolean} addBattery - Automatically add battery feature.
 * @returns {Object} Device for Gladys.
 * @example
 * loadFeatures('MyDevice', 'MODEL', true);
 */
function loadFeatures(name, model, addBattery) {
  const matchingFeatures = getFeaturesByModel(model);
  const loadedFeatures = matchingFeatures.map((f) => {
    return Object.assign({}, f);
  });

  if (addBattery) {
    loadedFeatures.push(Object.assign({}, features.battery));
  }

  loadedFeatures.forEach((feature) => {
    feature.external_id = `zigbee2mqtt:${name}:${feature.category}:${feature.type}:${feature.zigbeeField}`;
    feature.selector = feature.external_id;
  });

  return loadedFeatures;
}

module.exports = {
  loadFeatures,
};
