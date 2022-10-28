import swaggerJSDoc, { Options } from 'swagger-jsdoc';

import schemas from '#/backend/server/openapi-schemas.json';

const options: Options = {
  failOnErrors: true,
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'coodesh challenge - mkvlrn@gmail.com',
      version: '1.0.0',
    },
    components: {
      schemas,
    },
  },
  apis: ['**/*.router.ts', '**/*.router.js'],
};

export const spec = swaggerJSDoc(options);
