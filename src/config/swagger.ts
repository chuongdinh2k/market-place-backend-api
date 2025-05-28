import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Market Place API Documentation',
      version: '1.0.0',
      description: 'API documentation for the Market Place Backend API',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name: 'API Support',
        url: 'https://your-support-url.com',
        email: 'support@example.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000/v1',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/routes/*.ts', './src/routes/v1/*.ts', './src/models/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options); 