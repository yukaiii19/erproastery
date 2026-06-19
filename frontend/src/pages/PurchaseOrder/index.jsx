import React from 'react';
import CrudModule from '@/modules/CrudModule/CrudModule';
import PurchaseOrderForm from '@/forms/PurchaseOrderForm';
import { fields } from './config';
import useLanguage from '@/locale/useLanguage';
import dayjs from 'dayjs';
import { useMoney, useDate } from '@/settings';

export default function PurchaseOrder() {
  const translate = useLanguage();
  const entity = 'purchaseOrder';
  const searchConfig = {
    displayLabels: ['number'],
    searchFields: 'number',
  };
  const deleteModalLabels = ['number'];

  const Labels = {
    PANEL_TITLE: translate('Purchase Order') || 'Purchase Order',
    DATATABLE_TITLE: translate('Purchase Order List') || 'Purchase Order List',
    ADD_NEW_ENTITY: translate('Add New Purchase Order') || 'Add New Purchase Order',
    ENTITY_NAME: translate('Purchase Order') || 'Purchase Order',
  };
  const configPage = {
    entity,
    ...Labels,
  };
  const { dateFormat } = useDate();
  const { moneyFormatter } = useMoney();

  const dataTableColumns = [
    {
      title: translate('Number'),
      dataIndex: 'number',
    },
    {
      title: translate('Supplier'),
      dataIndex: 'supplier',
      render: (supplier) => supplier ? supplier.name || JSON.stringify(supplier) : 'Empty',
    },
    {
      title: translate('Date'),
      dataIndex: 'date',
      render: (date) => {
        return dayjs(date).format(dateFormat);
      },
    },
    {
      title: translate('Total'),
      dataIndex: 'total',
      render: (total, record) => {
        return moneyFormatter({ amount: total || 0, currency_code: record.currency });
      },
    },
  ];

  const config = {
    ...configPage,
    fields,
    searchConfig,
    deleteModalLabels,
    dataTableColumns,
  };
  return (
    <CrudModule
      createForm={<PurchaseOrderForm />}
      updateForm={<PurchaseOrderForm isUpdateForm={true} />}
      config={config}
    />
  );
}
