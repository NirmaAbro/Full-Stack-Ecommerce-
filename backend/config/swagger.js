import swaggerJsDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Ecommerce API",
      version: "1.0.0",
      description: "Full Ecommerce API Documentation",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
    security: [
        {
          bearerAuth: [],
        },
      ],

    components: {
      securitySchemes: {
        bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT", // ✅ ADD THIS
          },
      },

      schemas: {
        Product: {
          type: "object",
          required: ["name", "description", "price", "category"],
          properties: {
            _id: { type: "string" },
            name: { type: "string", example: "iPhone 14" },
            description: { type: "string", example: "Latest Apple phone" },
            price: { type: "number", example: 1200 },
            stock: { type: "number", example: 10 },
            category: { type: "string", example: "Electronics" },
            createdAt: { type: "string" },
            updatedAt: { type: "string" },
          },
        },

        UserAuth: {
            type: "object",
            required: ["email", "password"],
            properties: {
              email: { type: "string", example: "test@gmail.com" },
              password: { type: "string", example: "123456" },
            },
          },

        User: {
          type: "object",
          required: ["name", "email"],
          properties: {
            _id: { type: "string" },
            name: { type: "string" },
            email: { type: "string" },
            role: { type: "string", enum: ["admin", "user"] },
          },
        },

        Order: {
            type: "object",
            required: [
              "orderItems",
              "shippingAddress",
              "paymentMethod",
              "totalAmount",
            ],
            properties: {
              orderItems: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    product: {
                      type: "string",
                      example: "64f123abc123",
                    },
                    name: {
                      type: "string",
                      example: "iPhone 14",
                    },
                    image: {
                      type: "string",
                      example: "image.jpg",
                    },
                    price: {
                      type: "number",
                      example: 1200,
                    },
                    quantity: {
                      type: "number",
                      example: 2,
                    },
                  },
                },
              },
          
              shippingAddress: {
                type: "object",
                properties: {
                  address: { type: "string", example: "Street 1" },
                  city: { type: "string", example: "Karachi" },
                  postalCode: { type: "string", example: "75000" },
                  country: { type: "string", example: "Pakistan" },
                },
              },
          
              paymentMethod: {
                type: "string",
                enum: ["cod", "stripe", "paypal", "cash_on_delivery"],
                example: "cod",
              },
          
              totalAmount: {
                type: "number",
                example: 2400,
              },
          
              // ✅ CORRECT PLACE (ORDER LEVEL)
              orderStatus: {
                type: "string",
                enum: ["processing", "shipped", "delivered", "cancelled"],
                example: "processing",
              },
          
              paymentStatus: {
                type: "string",
                enum: ["pending", "paid"],
                example: "pending",
              },
            },
          },

        UpdateOrderStatus: {
          type: "object",
          properties: {
            orderStatus: {
              type: "string",
              enum: ["processing", "shipped", "delivered", "cancelled"],
              example: "shipped",
            },
          },
        },

        Cart: {
            type: "object",
            required: ["items"],
            properties: {
              user: {
                type: "string",
                example: "64f123abc123",
              },
              items: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    product: {
                      type: "string",
                      example: "64f123abc123",
                    },
                    quantity: {
                      type: "number",
                      example: 2,
                    },
                    price: {
                      type: "number",
                      example: 500,
                    },
                  },
                },
              },
              totalPrice: {
                type: "number",
                example: 1000,
              },
            },
          },

          AddToCart: {
            type: "object",
            required: ["productId", "quantity"],
            properties: {
              productId: { type: "string", example: "64f123abc123" },
              quantity: { type: "number", example: 2 },
            },
          },

          ApiResponse: {
            type: "object",
            properties: {
              success: { type: "boolean", example: true },
              message: { type: "string", example: "Success" },
              data: { type: "object" },
            },
          },

          ErrorResponse: {
            type: "object",
            properties: {
              success: { type: "boolean", example: false },
              message: { type: "string", example: "Something went wrong" },
            },
          },


      },
    },
  },

  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsDoc(options);

export default swaggerSpec;
