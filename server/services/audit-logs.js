'use strict';

module.exports = ({ strapi }) => ({
  async findMany(params) {
    
    const {
      pagination = {},
      filters = {}
    } = params

    const queryParams = {
      orderBy: {
        date: 'desc'
      }
    }

    if (pagination.pageSize) {
      queryParams['pageSize'] = pagination.pageSize
    }

    if (pagination.page) {
      queryParams['page'] = pagination.page
    }
    
    if (filters) {
      queryParams['filters'] = {
        ...filters
      }
    }

    return await strapi.entityService.findPage('plugin::strapi-audit-logs.audit-log', {
      ...queryParams
    })
  },
  async findOne(id) {
    return await strapi.db.query('plugin::strapi-audit-logs.audit-log').findOne({
      where: { id: id }
    });
  }
});