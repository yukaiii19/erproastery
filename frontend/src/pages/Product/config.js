export const fields = {
  name: {
    type: 'string',
    required: true,
  },
  type: {
    type: 'string',
  },
  price: {
    type: 'currency',
  },
  stockQuantity: {
    type: 'number',
  },
  enabled: {
    type: 'boolean',
  },
};
