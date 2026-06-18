import React from 'react';
import CrudModule from '@/modules/CrudModule/CrudModule';
import PurchaseInvoiceForm from '@/forms/PurchaseInvoiceForm';
import { fields } from './config';
import useLanguage from '@/locale/useLanguage';

export default function PurchaseInvoice() {
  const translate = useLanguage();
  const entity = 'purchaseInvoice';
  const searchConfig = {
    displayLabels: ['number'],
    searchFields: 'number',
  };
  const deleteModalLabels = ['number'];

  const Labels = {
    PANEL_TITLE: translate('Bill') || 'Bill (Purchase Invoice)',
    DATATABLE_TITLE: translate('Bill List') || 'Bill List',
    ADD_NEW_ENTITY: translate('Add Bill') || 'Add Bill',
    ENTITY_NAME: translate('Bill') || 'Bill',
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
      createForm={<PurchaseInvoiceForm />}
      updateForm={<PurchaseInvoiceForm isUpdateForm={true} />}
      config={config}
    />
  );
}
