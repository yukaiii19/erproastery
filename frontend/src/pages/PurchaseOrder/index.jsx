import React from 'react';
import CrudModule from '@/modules/CrudModule/CrudModule';
import PurchaseOrderForm from '@/forms/PurchaseOrderForm';
import { fields } from './config';
import useLanguage from '@/locale/useLanguage';

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
  const config = {
    ...configPage,
    fields,
    searchConfig,
    deleteModalLabels,
  };
  return (
    <CrudModule
      createForm={<PurchaseOrderForm />}
      updateForm={<PurchaseOrderForm isUpdateForm={true} />}
      config={config}
    />
  );
}
