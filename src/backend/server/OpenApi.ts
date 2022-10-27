import swaggerJSDoc, { Options } from 'swagger-jsdoc';

const options: Options = {
  failOnErrors: true,
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'coodesh challenge - mkvlrn@gmail.com',
      version: '1.0.0',
    },
    components: {
      healthcheck: {},
    },
  },
  apis: ['./modules/**/*.router.ts'],
};

export const spec = swaggerJSDoc(options);
