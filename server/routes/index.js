module.exports = [
  {
    method: 'GET',
    path: '/list',
    handler: 'logs.list',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/fetch/:id',
    handler: 'logs.fetch',
    config: {
      policies: [],
      auth: false,
    },
  }
];