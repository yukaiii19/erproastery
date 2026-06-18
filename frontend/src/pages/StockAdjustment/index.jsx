import React from 'react';
import CrudModule from '@/modules/CrudModule/CrudModule';
import StockAdjustmentForm from '@/forms/StockAdjustmentForm';
import useLanguage from '@/locale/useLanguage';
import dayjs from 'dayjs';
import { useDate } from '@/settings';
import { fields } from './config';

export default function StockAdjustment() {
  const translate = useLanguage();
  const { dateFormat } = useDate();
  const entity = 'stockadjustment';
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
      title: translate('Warehouse'),
      dataIndex: ['warehouse', 'name'],
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
      title: translate('Warehouse'),
      dataIndex: ['warehouse', 'name'],
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
    PANEL_TITLE: translate('Stock Adjustment'),
    DATATABLE_TITLE: translate('Stock Adjustment List'),
    ADD_NEW_ENTITY: translate('Add new Stock Adjustment'),
    ENTITY_NAME: translate('Stock Adjustment'),
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
      createForm={<StockAdjustmentForm />}
      updateForm={<StockAdjustmentForm isUpdateForm={true} />}
      config={config}
    />
  );
}
