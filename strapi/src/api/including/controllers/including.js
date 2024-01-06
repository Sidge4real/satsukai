'use strict';

/**
 * including controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::including.including');
