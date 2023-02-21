# Strapi Audit Logs Plugin

Plugin that adds very basic audit functionality to strapi sites.

Tested with Strapi version: 4.6.1

## Installation
```
npm install strapi-audit-logs
or
yarn add strapi-audit-logs
```

Alternatively download the plugin files and copy to:

```js
// src/plugins
```

## Setup

You have to enable the plugin in your plugins config file

```js
// config/plugins.js
module.exports = () => ({
  // ..
  'strapi-audit-logs': {
    enabled: true,
    resolve: '/path/to/plugin/files'
    // this will either be in `/node_modules/strapi-audit-logs` or `/src/plugins` depending on your install method.
  }
  // ..
})
```

## Todo:

- Authentication on audit log endpoints
- User access levels
- ~~Filtering~~
- ~~Searching~~ (scrapped this as a feature for now, may add at a later date.)
- ~~Pagination~~
- Export of logs (all and a range / selection)
- Auto export and cleaning of data at set intervals (to ensure db table doesn't get too biiiig)
- Tidy up code and refine data fetch queries