export const fields = {
  number: {
    type: 'string',
    required: true,
  },
  year: {
    type: 'string',
    required: true,
  },
  date: {
    type: 'date',
    required: true,
  },
  warehouse: {
    type: 'async',
    label: 'Warehouse',
    displayLabels: ['name'],
    dataIndex: ['warehouse', 'name'],
  },
  status: {
    type: 'string',
    required: true,
  },
};
