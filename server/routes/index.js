module.exports = {
  logs: {
    type: 'admin',
    routes: [
      {
        method: 'GET',
        path: '/list',
        handler: 'logs.findMany',
      },
      {
        method: 'GET',
        path: '/fetch/:id',
        handler: 'logs.findOne',
      }
    ]
  }
}