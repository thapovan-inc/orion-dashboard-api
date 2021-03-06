exports['default'] = {
  routes: (api) => {
    return {

      /* ---------------------
      routes.js

      For web clients (http and https) you can define an optional RESTful mapping to help route requests to actions.
      If the client doesn't specify and action in a param, and the base route isn't a named action, the action will attempt to be discerned from this routes.js file.

      Learn more here: http://www.actionherojs.com/docs/#routes

      examples:

      get: [
        { path: '/users', action: 'usersList' }, // (GET) /api/users
        { path: '/search/:term/limit/:limit/offset/:offset', action: 'search' }, // (GET) /api/search/car/limit/10/offset/100
      ],

      ---------------------- */

      post: [
        { path: '/traces', action: 'getTraceByFilter' } // (POST) /api/login/123
      ],

      all: [
        { path: '/traces/:traceId', action: 'getTraceById' }, // (*) /api/user/123, api/user/123/stuff
        { path: '/traces', action: 'getTraces', matchTrailingPathParts: true } // (*) /api/user/123, api/user/123/stuff
      ]

    }
  }
}
