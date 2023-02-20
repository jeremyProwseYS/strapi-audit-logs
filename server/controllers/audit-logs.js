'use strict';

module.exports = {
  async list(ctx) {
    ctx.body = await strapi
      .plugin('strapi-audit-logs')
      .service('logs')
      .list();
  },
  async fetch(ctx) {
    ctx.body = await strapi
      .plugin('strapi-audit-logs')
      .service('logs')
      .fetch(ctx.params.id);
  }
};