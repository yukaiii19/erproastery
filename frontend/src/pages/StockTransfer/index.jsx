import React from 'react';
import CrudModule from '@/modules/CrudModule/CrudModule';
import StockTransferForm from '@/forms/StockTransferForm';
import useLanguage from '@/locale/useLanguage';
import dayjs from 'dayjs';
import { useDate } from '@/settings';
import { fields } from './config';

export default function StockTransfer() {
  const translate = useLanguage();
  const { dateFormat } = useDate();
  const entity = 'stocktransfer';
  const searchConfig = {
    displayLabels: ['number'],
    searchFields: 'number',
  };
  const deleteModalLabels = ['number'];

  const dataTableColumns = [
    {
      title: translate('Number'),
      dataIndex: 'number',
    },
    {
      title: translate('Source Warehouse'),
      dataIndex: ['sourceWarehouse', 'name'],
    },
    {
      title: translate('Destination Warehouse'),
      dataIndex: ['destinationWarehouse', 'name'],
    },
    {
      title: translate('Date'),
      dataIndex: 'date',
      render: (date) => {
        return dayjs(date).format(dateFormat);
      },
    },
    {
      title: translate('Status'),
      dataIndex: 'status',
    },
  ];

  const readColumns = [
    {
      title: translate('Number'),
      dataIndex: 'number',
    },
    {
      title: translate('Source Warehouse'),
      dataIndex: ['sourceWarehouse', 'name'],
    },
    {
      title: translate('Destination Warehouse'),
      dataIndex: ['destinationWarehouse', 'name'],
    },
    {
      title: translate('Date'),
      dataIndex: 'date',
      render: (date) => {
        return dayjs(date).format(dateFormat);
      },
    },
    {
      title: translate('Status'),
      dataIndex: 'status',
    },
  ];

  const Labels = {
    PANEL_TITLE: translate('Stock Transfer'),
    DATATABLE_TITLE: translate('Stock Transfer List'),
    ADD_NEW_ENTITY: translate('Add new Stock Transfer'),
    ENTITY_NAME: translate('Stock Transfer'),
  };
  const configPage = {
    entity,
    ...Labels,
  };
  const config = {
    ...configPage,
    fields,
    readColumns,
    dataTableColumns,
    searchConfig,
    deleteModalLabels,
  };
  return (
    <CrudModule
      createForm={<StockTransferForm />}
      updateForm={<StockTransferForm isUpdateForm={true} />}
      config={config}
    />
  );
}
