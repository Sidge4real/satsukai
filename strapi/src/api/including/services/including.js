'use strict';

/**
 * including service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::including.including');
