const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Your API",
      version: "1.0.0",
      description: "API documentation for your Express application.",
    },
  },
  apis: ["../api/routes"],
};

export const swaggerSpecs = swaggerJsdoc(options);
