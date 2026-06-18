import React from 'react';
import CrudModule from '@/modules/CrudModule/CrudModule';
import SupplierForm from '@/forms/SupplierForm';
import { fields } from './config';
import useLanguage from '@/locale/useLanguage';

export default function Supplier() {
  const translate = useLanguage();
  const entity = 'supplier';
  const searchConfig = {
    displayLabels: ['name'],
    searchFields: 'name,phone,email',
  };
  const deleteModalLabels = ['name'];

  const Labels = {
    PANEL_TITLE: translate('Supplier') || 'Supplier',
    DATATABLE_TITLE: translate('Supplier List') || 'Supplier List',
    ADD_NEW_ENTITY: translate('Add New Supplier') || 'Add New Supplier',
    ENTITY_NAME: translate('Supplier') || 'Supplier',
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
      createForm={<SupplierForm />}
      updateForm={<SupplierForm isUpdateForm={true} />}
      config={config}
    />
  );
}
