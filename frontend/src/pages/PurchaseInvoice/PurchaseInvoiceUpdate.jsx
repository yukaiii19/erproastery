import useLanguage from '@/locale/useLanguage';
import UpdatePurchaseInvoiceModule from '@/modules/PurchaseInvoiceModule/UpdatePurchaseInvoiceModule';

export default function PurchaseInvoiceUpdate() {
  const entity = 'purchaseInvoice';
  const translate = useLanguage();
  const Labels = {
    PANEL_TITLE: translate('purchaseInvoice'),
    DATATABLE_TITLE: translate('purchaseInvoice_list'),
    ADD_NEW_ENTITY: translate('add_new_purchaseInvoice'),
    ENTITY_NAME: translate('purchaseInvoice'),

    RECORD_ENTITY: translate('record_payment'),
  };

  const configPage = {
    entity,
    ...Labels,
  };
  return <UpdatePurchaseInvoiceModule config={configPage} />;
}
