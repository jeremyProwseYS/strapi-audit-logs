module.exports = {
  kind: "collectionType",
  collectionName: "audit-log",
  info: {
    singularName: "audit-log",
    pluralName: "audit-logs",
    displayName: "Audit Logs"
  },
  options: {
    draftAndPublish: false,
    comment: ""
  },
  pluginOptions: {
    "content-manager": {
      visible: false
    },
    "content-type-builder": {
      visible: false
    }
  },
  attributes: {
    action: {
      type: "string",
      required: true,
      editableField: false
    },
    date: {
      type: "date",
      required: true,
      editableField: false
    },
    user: {
      type: "string",
      required: true,
      editableField: false
    },
    request: {
      type: "json",
      required: true,
      editableField: false
    }
  }
}