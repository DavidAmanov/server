const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
      openapi: '3.0.0',
      info: {
          title: 'API Documentation',
          version: '1.0.0',
          description: 'API Information',
          contact: {
              name: 'Developer',
          },
          servers: [`http://localhost:3001`],
      },
  },
  apis: ['./routes/index.js'], // Path to the API docs
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs