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
  sourceWarehouse: {
    type: 'async',
    label: 'Source Warehouse',
    displayLabels: ['name'],
    dataIndex: ['sourceWarehouse', 'name'],
  },
  destinationWarehouse: {
    type: 'async',
    label: 'Destination Warehouse',
    displayLabels: ['name'],
    dataIndex: ['destinationWarehouse', 'name'],
  },
  status: {
    type: 'string',
    required: true,
  },
};
