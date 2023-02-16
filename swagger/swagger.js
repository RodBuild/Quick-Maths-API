const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    version: '1.0.0', // by default: '1.0.0'
    title: 'math_friendly_api', // by default: 'REST API'
    description:
      'The API will return math formulas intented to be used on a timed quiz environment.', // by default: ''
  },
  host: 'localhost:3000', // by default: 'localhost:3000'
  basePath: '', // by default: '/'
  schemes: ['https', 'http'], // by default: ['http']
  consumes: [], // by default: ['application/json']
  produces: [], // by default: ['application/json']
  tags: [
    // by default: empty Array
    {
      name: 'test', // Tag name
      description: 'test1', // Tag description
    },
    // { ... }
  ],
  securityDefinitions: {}, // by default: empty object
  definitions: {}, // by default: empty object (Swagger 2.0)
  components: {}, // by default: empty object (OpenAPI 3.x)
};

const outputFile = './swagger/swagger.json';
const endpointsFiles = ['./routes/index.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as: index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);
