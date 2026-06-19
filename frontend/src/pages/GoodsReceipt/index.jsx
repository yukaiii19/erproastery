import React from 'react';
import CrudModule from '@/modules/CrudModule/CrudModule';
import GoodsReceiptForm from '@/forms/GoodsReceiptForm';
import { fields } from './config';
import useLanguage from '@/locale/useLanguage';
import dayjs from 'dayjs';
import { useDate } from '@/settings';

export default function GoodsReceipt() {
  const translate = useLanguage();
  const entity = 'goodsReceipt';
  const searchConfig = {
    displayLabels: ['number'],
    searchFields: 'number',
  };
  const deleteModalLabels = ['number'];

  const Labels = {
    PANEL_TITLE: translate('Goods Receipt') || 'Goods Receipt',
    DATATABLE_TITLE: translate('Goods Receipt List') || 'Goods Receipt List',
    ADD_NEW_ENTITY: translate('Add Goods Receipt') || 'Add Goods Receipt',
    ENTITY_NAME: translate('Goods Receipt') || 'Goods Receipt',
  };
  const configPage = {
    entity,
    ...Labels,
  };
  const { dateFormat } = useDate();

  const dataTableColumns = [
    {
      title: translate('Number'),
      dataIndex: 'number',
    },
    {
      title: translate('Purchase Order'),
      dataIndex: 'purchaseOrder',
      render: (purchaseOrder) => purchaseOrder ? purchaseOrder.number || JSON.stringify(purchaseOrder) : 'Empty',
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
      createForm={<GoodsReceiptForm />}
      updateForm={<GoodsReceiptForm isUpdateForm={true} />}
      config={config}
    />
  );
}
