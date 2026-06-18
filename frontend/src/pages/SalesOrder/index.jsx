import React from 'react';
import CrudModule from '@/modules/CrudModule/CrudModule';
import SalesOrderForm from '@/forms/SalesOrderForm';
import { fields } from './config';
import useLanguage from '@/locale/useLanguage';

export default function SalesOrder() {
  const translate = useLanguage();
  const entity = 'salesOrder';
  const searchConfig = {
    displayLabels: ['number'],
    searchFields: 'number',
  };
  const deleteModalLabels = ['number'];

  const Labels = {
    PANEL_TITLE: translate('Sales Order') || 'Sales Order',
    DATATABLE_TITLE: translate('Sales Order List') || 'Sales Order List',
    ADD_NEW_ENTITY: translate('Add New Sales Order') || 'Add New Sales Order',
    ENTITY_NAME: translate('Sales Order') || 'Sales Order',
  };
  const configPage = {
    entity,
    ...Labels,
  };
  const config = {
    ...configPage,
    fields,
    searchConfig,
    deleteModalLabels,
  };
  return (
    <CrudModule
      createForm={<SalesOrderForm />}
      updateForm={<SalesOrderForm isUpdateForm={true} />}
      config={config}
    />
  );
}
