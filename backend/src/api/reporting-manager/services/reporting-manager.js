'use strict';

/**
 * reporting-manager service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::reporting-manager.reporting-manager');
