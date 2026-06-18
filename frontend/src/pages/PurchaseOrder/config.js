export const fields = {
  number: {
    type: 'number',
    required: true,
  },
  supplier: {
    type: 'string', // Actually ObjectId but we'll display as string for basic CRUD
  },
  date: {
    type: 'date',
    required: true,
  },
  status: {
    type: 'string',
  },
};
