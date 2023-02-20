# Strapi Audit Logs Plugin

Plugin that adds very basic audit functionality to strapi sites.

Tested with Strapi version: 4.6.1

## installation
```
yarn strapi install strapi-audit-logs
```

alternatively clone the plugin files and copy to:

```js
// src/plugins
```

## setup

You have to enable the plugin in your plugins config file

```js
// config/plugins.js
module.exports = () => ({
  // ..
  'strapi-audit-logs': {
    enabled: true,
    resolve: './src/plugins/strapi-audit-logs'
  }
  // ..
})
```

## Todo:

- Authentication on audit log endpoints
- User access levels
- Filtering
- Searching
- Pagination
- Export of logs (all and a range / selection)
- Auto export and cleaning of data at set intervals (to ensure db table doesn't get too biiiig)
- Tidy up code and refine data fetch queries