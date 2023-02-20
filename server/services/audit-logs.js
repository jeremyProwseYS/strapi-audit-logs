'use strict';

module.exports = ({ strapi }) => ({
  async list() {
    return await strapi.query('plugin::strapi-audit-logs.audit-log').findMany();
  },
  async fetch(id) {
    return await strapi.query('plugin::strapi-audit-logs.audit-log').findOne({
      where: { id: id }
    });
  }
});