import React from 'react';
import CrudModule from '@/modules/CrudModule/CrudModule';
import WarehouseForm from '@/forms/WarehouseForm';
import { fields } from './config';

import useLanguage from '@/locale/useLanguage';

export default function Warehouse() {
  const translate = useLanguage();
  const entity = 'warehouse';
  const searchConfig = {
    displayLabels: ['name'],
    searchFields: 'name',
  };
  const deleteModalLabels = ['name'];

  const Labels = {
    PANEL_TITLE: translate('Warehouse') || 'Warehouse',
    DATATABLE_TITLE: translate('Warehouse List') || 'Warehouse List',
    ADD_NEW_ENTITY: translate('Add New Warehouse') || 'Add New Warehouse',
    ENTITY_NAME: translate('Warehouse') || 'Warehouse',
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
      createForm={<WarehouseForm />}
      updateForm={<WarehouseForm isUpdateForm={true} />}
      config={config}
    />
  );
}
