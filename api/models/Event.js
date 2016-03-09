/**
* Event.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
      
        datetime: {
            type: 'datetime',
            required: true
        },

        param: {
            type: 'string'
        },

        user: {
            model: 'User'
        },

        eventtype: {
            model: 'EventType',
            required: true
        }

  }
};

