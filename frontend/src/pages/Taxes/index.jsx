import React from 'react';
import CrudModule from '@/modules/CrudModule/CrudModule';
import TaxesForm from '@/forms/TaxesForm';
import { fields } from './config';

import useLanguage from '@/locale/useLanguage';

export default function Taxes() {
  const translate = useLanguage();
  const entity = 'taxes';
  const searchConfig = {
    displayLabels: ['taxName'],
    searchFields: 'taxName',
  };
  const deleteModalLabels = ['taxName'];

  const Labels = {
    PANEL_TITLE: translate('taxes'),
    DATATABLE_TITLE: translate('taxes_list'),
    ADD_NEW_ENTITY: translate('add_new_tax'),
    ENTITY_NAME: translate('taxes'),
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
      createForm={<TaxesForm />}
      updateForm={<TaxesForm isUpdateForm={true} />}
      config={config}
    />
  );
}
