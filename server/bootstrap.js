'use strict';

const excludedPaths = [
  'plugin::strapi-audit-logs.audit-log',
  'strapi::core-store'
]

const capitalized = (word) => {
  return !word ? null : word.charAt(0).toUpperCase() + word.slice(1)
}

const createAuditEntry = (event, action) => {

  if (!event || !action || excludedPaths.includes(event?.model?.uid)) return;

  const { model, result } = event;
  const contentType = capitalized(model.singularName)

  console.log('EVENT', event)

  const user = result.updatedBy ? result.updatedBy.email : result.user ? result.user : "Developer"

  strapi.entityService.create('plugin::strapi-audit-logs.audit-log', {

    data: {
      action: `${contentType} ${action}`,
      date: result.updatedAt,
      user: user,
      request: event,
    },

  });
}

module.exports = ({ strapi }) => {
  strapi.db.lifecycles.subscribe({

    afterCreate(event) {
      createAuditEntry(event, 'Created')
    },

    afterUpdate(event) {
      createAuditEntry(event, 'Updated')
    },

    afterDelete(event) {
      createAuditEntry(event, 'Deleted')
    },

  });
};
