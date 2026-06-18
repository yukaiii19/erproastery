import React from 'react';
import CrudModule from '@/modules/CrudModule/CrudModule';
import FulfillmentForm from '@/forms/FulfillmentForm';
import { fields } from './config';
import useLanguage from '@/locale/useLanguage';

export default function Fulfillment() {
  const translate = useLanguage();
  const entity = 'fulfillment';
  const searchConfig = {
    displayLabels: ['number'],
    searchFields: 'number',
  };
  const deleteModalLabels = ['number'];

  const Labels = {
    PANEL_TITLE: translate('Fulfillment') || 'Fulfillment',
    DATATABLE_TITLE: translate('Fulfillment List') || 'Fulfillment List',
    ADD_NEW_ENTITY: translate('Add New Fulfillment') || 'Add New Fulfillment',
    ENTITY_NAME: translate('Fulfillment') || 'Fulfillment',
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
      createForm={<FulfillmentForm />}
      updateForm={<FulfillmentForm isUpdateForm={true} />}
      config={config}
    />
  );
}
