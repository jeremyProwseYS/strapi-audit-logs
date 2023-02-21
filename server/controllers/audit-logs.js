'use strict';

module.exports = {
  async findMany(ctx) {
    ctx.body = await strapi
      .plugin('strapi-audit-logs')
      .service('logs')
      .findMany(ctx.query);
  },
  async findOne(ctx) {
    ctx.body = await strapi
      .plugin('strapi-audit-logs')
      .service('logs')
      .findOne(ctx.params.id);
  }
};